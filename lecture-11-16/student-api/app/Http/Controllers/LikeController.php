<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use OpenApi\Attributes as OA;

class LikeController extends Controller
{
    #[OA\Post(path: '/posts/{post}/toggle-like', tags: ['Likes'], summary: 'Toggle like', security: [['bearerAuth' => []]])]
    #[OA\Parameter(name: 'post', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))]
    #[OA\Response(response: 200, description: 'Like toggled')]
    public function toggle($postId): JsonResponse
    {
        $post = Post::findOrFail($postId);

        $existing = Like::where('user_id', auth()->id())
            ->where('post_id', $postId)
            ->first();

        if ($existing) {
            $existing->delete();
            $liked = false;
        } else {
            Like::create([
                'user_id' => auth()->id(),
                'post_id' => $postId,
            ]);
            $liked = true;
        }

        return response()->json([
            'liked' => $liked,
            'likes_count' => $post->likes()->count(),
        ]);
    }

    #[OA\Post(path: '/posts/{post}/like', tags: ['Likes'], summary: 'Like a post', security: [['bearerAuth' => []]])]
    #[OA\Parameter(name: 'post', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))]
    #[OA\Response(response: 200, description: 'Post liked')]
    public function like($postId): JsonResponse
    {
        $post = Post::findOrFail($postId);

        $existing = Like::where('user_id', auth()->id())
            ->where('post_id', $postId)
            ->first();

        if ($existing) {
            return response()->json(['message' => 'Already liked'], 409);
        }

        Like::create([
            'user_id' => auth()->id(),
            'post_id' => $postId,
        ]);

        return response()->json([
            'message' => 'Post liked',
            'likes_count' => $post->likes()->count(),
        ]);
    }

    #[OA\Delete(path: '/posts/{post}/like', tags: ['Likes'], summary: 'Unlike a post', security: [['bearerAuth' => []]])]
    #[OA\Parameter(name: 'post', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))]
    #[OA\Response(response: 200, description: 'Like removed')]
    public function unlike($postId): JsonResponse
    {
        $post = Post::findOrFail($postId);

        $existing = Like::where('user_id', auth()->id())
            ->where('post_id', $postId)
            ->first();

        if (!$existing) {
            return response()->json(['message' => 'Not liked yet'], 404);
        }

        $existing->delete();

        return response()->json([
            'message' => 'Like removed',
            'likes_count' => $post->likes()->count(),
        ]);
    }
}
