<?php

namespace App\Http\Controllers;

use App\Models\Friendship;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use OpenApi\Attributes as OA;

class FriendController extends Controller
{
    #[OA\Post(path: '/friend-request/{user}', tags: ['Friends'], summary: 'Send friend request', security: [['bearerAuth' => []]])]
    #[OA\Parameter(name: 'user', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))]
    #[OA\Response(response: 201, description: 'Request sent')]
    #[OA\Response(response: 409, description: 'Already sent or friends')]
    public function sendRequest($userId): JsonResponse
    {
        $receiver = User::findOrFail($userId);

        if ($receiver->id === auth()->id()) {
            return response()->json(['error' => 'Cannot send friend request to yourself'], 400);
        }

        $existing = Friendship::where(function ($q) use ($receiver) {
            $q->where('sender_id', auth()->id())->where('receiver_id', $receiver->id);
        })->orWhere(function ($q) use ($receiver) {
            $q->where('sender_id', $receiver->id)->where('receiver_id', auth()->id());
        })->first();

        if ($existing) {
            $msg = match ($existing->status) {
                'pending' => 'Friend request already sent',
                'accepted' => 'Already friends',
                'blocked' => 'Unable to send request',
                default => 'Request exists',
            };
            return response()->json(['error' => $msg], 409);
        }

        Friendship::create([
            'sender_id' => auth()->id(),
            'receiver_id' => $receiver->id,
            'status' => 'pending',
        ]);

        return response()->json(['message' => 'Friend request sent'], 201);
    }

    #[OA\Post(path: '/friend-request/{user}/accept', tags: ['Friends'], summary: 'Accept friend request', security: [['bearerAuth' => []]])]
    #[OA\Parameter(name: 'user', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))]
    #[OA\Response(response: 200, description: 'Request accepted')]
    public function acceptRequest($userId): JsonResponse
    {
        $friendship = Friendship::where('sender_id', $userId)
            ->where('receiver_id', auth()->id())
            ->where('status', 'pending')
            ->firstOrFail();

        $friendship->update(['status' => 'accepted']);

        return response()->json(['message' => 'Friend request accepted']);
    }

    #[OA\Delete(path: '/friend-request/{user}', tags: ['Friends'], summary: 'Reject friend request', security: [['bearerAuth' => []]])]
    #[OA\Parameter(name: 'user', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))]
    #[OA\Response(response: 200, description: 'Request rejected')]
    public function rejectRequest($userId): JsonResponse
    {
        $friendship = Friendship::where('sender_id', $userId)
            ->where('receiver_id', auth()->id())
            ->where('status', 'pending')
            ->firstOrFail();

        $friendship->delete();

        return response()->json(['message' => 'Friend request rejected']);
    }

    #[OA\Delete(path: '/friends/{user}', tags: ['Friends'], summary: 'Remove a friend', security: [['bearerAuth' => []]])]
    #[OA\Parameter(name: 'user', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))]
    #[OA\Response(response: 200, description: 'Friend removed')]
    public function removeFriend($userId): JsonResponse
    {
        $friendship = Friendship::where(function ($q) use ($userId) {
            $q->where('sender_id', auth()->id())->where('receiver_id', $userId);
        })->orWhere(function ($q) use ($userId) {
            $q->where('sender_id', $userId)->where('receiver_id', auth()->id());
        })->where('status', 'accepted')->firstOrFail();

        $friendship->delete();

        return response()->json(['message' => 'Friend removed']);
    }

    #[OA\Get(path: '/friends', tags: ['Friends'], summary: 'List friends', security: [['bearerAuth' => []]])]
    #[OA\Response(response: 200, description: 'Paginated friends list')]
    public function friends(): JsonResponse
    {
        $friends = auth()->user()->friends()->paginate(15);

        return response()->json($friends);
    }

    #[OA\Get(path: '/friend-requests/pending', tags: ['Friends'], summary: 'Pending received requests', security: [['bearerAuth' => []]])]
    #[OA\Response(response: 200, description: 'Paginated pending requests')]
    public function pendingRequests(): JsonResponse
    {
        $requests = Friendship::with('sender:id,name,email')
            ->where('receiver_id', auth()->id())
            ->where('status', 'pending')
            ->paginate(15);

        return response()->json($requests);
    }

    #[OA\Get(path: '/friend-requests/sent', tags: ['Friends'], summary: 'Sent requests', security: [['bearerAuth' => []]])]
    #[OA\Response(response: 200, description: 'Paginated sent requests')]
    public function sentRequests(): JsonResponse
    {
        $requests = Friendship::with('receiver:id,name,email')
            ->where('sender_id', auth()->id())
            ->where('status', 'pending')
            ->paginate(15);

        return response()->json($requests);
    }
}
