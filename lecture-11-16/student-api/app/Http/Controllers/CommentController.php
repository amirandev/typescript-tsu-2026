<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use OpenApi\Attributes as OA;

class CommentController extends Controller
{
    #[OA\Get(path: '/posts/{post}/comments', tags: ['Comments'], summary: 'List comments', security: [['bearerAuth' => []]])]
    #[OA\Parameter(name: 'post', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))]
    #[OA\Response(response: 200, description: 'Paginated comments')]
    public function index($postId): JsonResponse
    {
        $post = Post::findOrFail($postId);

        $comments = $post->comments()
            ->with('user:id,name')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json($comments);
    }

    #[OA\Post(path: '/posts/{post}/comments', tags: ['Comments'], summary: 'Add a comment', security: [['bearerAuth' => []]])]
    #[OA\Parameter(name: 'post', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))]
    #[OA\RequestBody(required: true, content: new OA\JsonContent(required: ['body'], properties: [
        new OA\Property(property: 'body', type: 'string', example: 'Great post!'),
    ]))]
    #[OA\Response(response: 201, description: 'Comment added')]
    public function store(Request $request, $postId): JsonResponse
    {
        $post = Post::findOrFail($postId);

        $validator = Validator::make($request->all(), [
            'body' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $comment = Comment::create([
            'user_id' => auth()->id(),
            'post_id' => $postId,
            'body' => $request->body,
        ]);

        $comment->load('user:id,name');

        return response()->json([
            'message' => 'Comment added',
            'comment' => $comment,
        ], 201);
    }

    #[OA\Delete(path: '/posts/{post}/comments/{comment}', tags: ['Comments'], summary: 'Delete a comment', security: [['bearerAuth' => []]])]
    #[OA\Parameter(name: 'post', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))]
    #[OA\Parameter(name: 'comment', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))]
    #[OA\Response(response: 200, description: 'Comment deleted')]
    public function destroy($postId, $commentId): JsonResponse
    {
        $comment = Comment::where('post_id', $postId)
            ->where('id', $commentId)
            ->firstOrFail();

        if ($comment->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $comment->delete();

        return response()->json(['message' => 'Comment deleted']);
    }
}
