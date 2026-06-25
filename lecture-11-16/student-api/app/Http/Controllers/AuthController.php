<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use OpenApi\Attributes as OA;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    #[OA\Post(path: '/register', tags: ['Auth'], summary: 'Register a new user')]
    #[OA\RequestBody(required: true, content: new OA\JsonContent(required: ['name', 'email', 'password', 'password_confirmation'], properties: [
        new OA\Property(property: 'name', type: 'string', example: 'John Doe'),
        new OA\Property(property: 'email', type: 'string', format: 'email', example: 'john@example.com'),
        new OA\Property(property: 'password', type: 'string', format: 'password', example: 'password123'),
        new OA\Property(property: 'password_confirmation', type: 'string', format: 'password', example: 'password123'),
    ]))]
    #[OA\Response(response: 201, description: 'User created')]
    #[OA\Response(response: 422, description: 'Validation error')]
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    #[OA\Post(path: '/login', tags: ['Auth'], summary: 'Login')]
    #[OA\RequestBody(required: true, content: new OA\JsonContent(required: ['email', 'password'], properties: [
        new OA\Property(property: 'email', type: 'string', format: 'email', example: 'john@example.com'),
        new OA\Property(property: 'password', type: 'string', format: 'password', example: 'password123'),
    ]))]
    #[OA\Response(response: 200, description: 'Login successful, returns token')]
    #[OA\Response(response: 401, description: 'Invalid credentials')]
    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if (!$token = JWTAuth::attempt($request->only('email', 'password'))) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => auth()->user(),
        ]);
    }

    #[OA\Get(path: '/me', tags: ['Auth'], summary: 'Get current user', security: [['bearerAuth' => []]])]
    #[OA\Response(response: 200, description: 'Current user data')]
    public function me(): JsonResponse
    {
        $user = auth()->user();
        $user->posts_count = $user->posts()->count();
        $user->friends_count = $user->friends()->count();
        return response()->json($user);
    }

    #[OA\Get(path: '/profile', tags: ['Auth'], summary: 'Get own posts (paginated)', security: [['bearerAuth' => []]])]
    #[OA\Parameter(name: 'per_page', in: 'query', description: 'Items per page', schema: new OA\Schema(type: 'integer', default: 15))]
    #[OA\Response(response: 200, description: 'Paginated list of own posts')]
    public function profile(Request $request): JsonResponse
    {
        $posts = auth()->user()->posts()
            ->withCount(['likes', 'comments', 'shares'])
            ->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 15));

        $posts->getCollection()->transform(function ($post) {
            $post->is_liked = $post->isLikedBy(auth()->user());
            return $post;
        });

        return response()->json($posts);
    }

    #[OA\Post(path: '/logout', tags: ['Auth'], summary: 'Logout', security: [['bearerAuth' => []]])]
    #[OA\Response(response: 200, description: 'Logged out')]
    public function logout(): JsonResponse
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    #[OA\Post(path: '/refresh', tags: ['Auth'], summary: 'Refresh token', security: [['bearerAuth' => []]])]
    #[OA\Response(response: 200, description: 'New token')]
    public function refresh(): JsonResponse
    {
        return response()->json([
            'token' => auth()->refresh(),
        ]);
    }

    #[OA\Post(path: '/change-password', tags: ['Auth'], summary: 'Change password', security: [['bearerAuth' => []]])]
    #[OA\RequestBody(required: true, content: new OA\JsonContent(required: ['current_password', 'new_password', 'new_password_confirmation'], properties: [
        new OA\Property(property: 'current_password', type: 'string', format: 'password', example: 'oldpass123'),
        new OA\Property(property: 'new_password', type: 'string', format: 'password', example: 'newpass123'),
        new OA\Property(property: 'new_password_confirmation', type: 'string', format: 'password', example: 'newpass123'),
    ]))]
    #[OA\Response(response: 200, description: 'Password changed')]
    #[OA\Response(response: 400, description: 'Current password is incorrect')]
    public function changePassword(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = auth()->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['error' => 'Current password is incorrect'], 400);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['message' => 'Password changed successfully']);
    }
}
