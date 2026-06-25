<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Share;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use OpenApi\Attributes as OA;

class ShareController extends Controller
{
    #[OA\Post(path: '/posts/{post}/share', tags: ['Shares'], summary: 'Share a post', security: [['bearerAuth' => []]])]
    #[OA\Parameter(name: 'post', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))]
    #[OA\RequestBody(content: new OA\JsonContent(properties: [
        new OA\Property(property: 'platform', type: 'string', example: 'facebook', nullable: true),
    ]))]
    #[OA\Response(response: 201, description: 'Post shared')]
    public function store(Request $request, $postId): JsonResponse
    {
        $post = Post::findOrFail($postId);

        $validator = Validator::make($request->all(), [
            'platform' => 'nullable|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $existing = Share::where('user_id', auth()->id())
            ->where('post_id', $postId)
            ->where('platform', $request->platform)
            ->first();

        if ($existing) {
            return response()->json([
                'message' => 'Already shared',
                'shares_count' => $post->shares()->count(),
            ]);
        }

        Share::create([
            'user_id' => auth()->id(),
            'post_id' => $postId,
            'platform' => $request->platform,
        ]);

        return response()->json([
            'message' => 'Post shared',
            'shares_count' => $post->shares()->count(),
        ], 201);
    }

    #[OA\Get(path: '/posts/{post}/share-count', tags: ['Shares'], summary: 'Get share count')]
    #[OA\Parameter(name: 'post', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))]
    #[OA\Parameter(name: 'platform', in: 'query', description: 'Filter by platform', schema: new OA\Schema(type: 'string'))]
    #[OA\Response(response: 200, description: 'Share count')]
    public function count($postId): JsonResponse
    {
        $post = Post::findOrFail($postId);

        $platform = request('platform');

        if ($platform) {
            $count = $post->shares()->where('platform', $platform)->count();
        } else {
            $count = $post->shares()->count();
        }

        return response()->json([
            'shares_count' => $count,
        ]);
    }
}
