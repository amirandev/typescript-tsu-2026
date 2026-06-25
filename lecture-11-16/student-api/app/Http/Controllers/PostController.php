<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use OpenApi\Attributes as OA;

class PostController extends Controller
{
    #[OA\Get(path: '/posts', tags: ['Posts'], summary: 'List all posts (paginated)')]
    #[OA\Parameter(name: 'page', in: 'query', description: 'Page number', schema: new OA\Schema(type: 'integer', default: 1))]
    #[OA\Parameter(name: 'per_page', in: 'query', description: 'Items per page', schema: new OA\Schema(type: 'integer', default: 15))]
    #[OA\Response(response: 200, description: 'Paginated list of posts')]
    public function index(Request $request): JsonResponse
    {
        $posts = Post::withCount(['likes', 'comments', 'shares'])
            ->with(['user:id,name'])
            ->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 15));

        $posts->getCollection()->transform(function ($post) {
            if (auth()->check()) {
                $post->is_liked = $post->isLikedBy(auth()->user());
            } else {
                $post->is_liked = false;
            }
            return $post;
        });

        return response()->json($posts);
    }

    #[OA\Post(path: '/posts', tags: ['Posts'], summary: 'Create a post', security: [['bearerAuth' => []]])]
    #[OA\RequestBody(required: true, content: new OA\JsonContent(required: ['title', 'body'], properties: [
        new OA\Property(property: 'title', type: 'string', example: 'My Post Title'),
        new OA\Property(property: 'body', type: 'string', example: 'Post content here...'),
    ]))]
    #[OA\Response(response: 201, description: 'Post created')]
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'body' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $post = Post::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'body' => $request->body,
        ]);

        return response()->json([
            'message' => 'Post created successfully',
            'post' => $post->loadCount(['likes', 'comments', 'shares']),
        ], 201);
    }

    #[OA\Get(path: '/posts/{id}', tags: ['Posts'], summary: 'Show a post')]
    #[OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))]
    #[OA\Response(response: 200, description: 'Post details with comments')]
    public function show($id): JsonResponse
    {
        $post = Post::withCount(['likes', 'comments', 'shares'])
            ->with(['user:id,name', 'comments.user:id,name'])
            ->findOrFail($id);

        if (auth()->check()) {
            $post->is_liked = $post->isLikedBy(auth()->user());
        } else {
            $post->is_liked = false;
        }

        return response()->json($post);
    }

    #[OA\Put(path: '/posts/{id}', tags: ['Posts'], summary: 'Update a post', security: [['bearerAuth' => []]])]
    #[OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))]
    #[OA\RequestBody(content: new OA\JsonContent(properties: [
        new OA\Property(property: 'title', type: 'string'),
        new OA\Property(property: 'body', type: 'string'),
    ]))]
    #[OA\Response(response: 200, description: 'Post updated')]
    public function update(Request $request, $id): JsonResponse
    {
        $post = Post::findOrFail($id);

        if ($post->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'body' => 'sometimes|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $post->update($request->only(['title', 'body']));

        return response()->json([
            'message' => 'Post updated successfully',
            'post' => $post->loadCount(['likes', 'comments', 'shares']),
        ]);
    }

    #[OA\Get(path: '/timeline', tags: ['Posts'], summary: 'Friends posts (paginated)', security: [['bearerAuth' => []]])]
    #[OA\Parameter(name: 'per_page', in: 'query', schema: new OA\Schema(type: 'integer', default: 15))]
    #[OA\Response(response: 200, description: 'Paginated friends posts')]
    public function timeline(Request $request): JsonResponse
    {
        $friendIds = auth()->user()->friends()->pluck('id');

        $posts = Post::whereIn('user_id', $friendIds)
            ->withCount(['likes', 'comments', 'shares'])
            ->with(['user:id,name'])
            ->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 15));

        $posts->getCollection()->transform(function ($post) {
            $post->is_liked = $post->isLikedBy(auth()->user());
            return $post;
        });

        return response()->json($posts);
    }

    #[OA\Delete(path: '/posts/{id}', tags: ['Posts'], summary: 'Delete a post', security: [['bearerAuth' => []]])]
    #[OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))]
    #[OA\Response(response: 200, description: 'Post deleted')]
    public function destroy($id): JsonResponse
    {
        $post = Post::findOrFail($id);

        if ($post->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $post->delete();

        return response()->json(['message' => 'Post deleted successfully']);
    }
}
