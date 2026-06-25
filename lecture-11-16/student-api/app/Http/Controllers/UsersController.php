<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class UsersController extends Controller
{
    #[OA\Get(path: '/users', tags: ['Users'], summary: 'List users with search', security: [['bearerAuth' => []]])]
    #[OA\Parameter(name: 'search', in: 'query', description: 'Search by name or email', schema: new OA\Schema(type: 'string'))]
    #[OA\Parameter(name: 'per_page', in: 'query', schema: new OA\Schema(type: 'integer', default: 15))]
    #[OA\Response(response: 200, description: 'Paginated users list')]
    public function index(Request $request): JsonResponse
    {
        $search = $request->get('search');

        $users = User::query()
            ->when($search, function ($q, $search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            })
            ->orderBy('name')
            ->paginate($request->get('per_page', 15));

        $users->getCollection()->transform(function ($user) {
            $authUser = auth()->user();
            $user->is_friend = $authUser->isFriendWith($user);
            $user->friend_request_sent = $authUser->hasSentFriendRequestTo($user);
            $user->friend_request_received = $authUser->hasPendingFriendRequestFrom($user);
            return $user;
        });

        return response()->json($users);
    }

    #[OA\Get(path: '/users/{id}', tags: ['Users'], summary: 'Show a user', security: [['bearerAuth' => []]])]
    #[OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))]
    #[OA\Response(response: 200, description: 'User details')]
    public function show($id): JsonResponse
    {
        $user = User::findOrFail($id);
        $authUser = auth()->user();

        $user->is_friend = $authUser->isFriendWith($user);
        $user->friend_request_sent = $authUser->hasSentFriendRequestTo($user);
        $user->friend_request_received = $authUser->hasPendingFriendRequestFrom($user);
        $user->posts_count = $user->posts()->count();
        $user->friends_count = $user->friends()->count();

        return response()->json($user);
    }
}
