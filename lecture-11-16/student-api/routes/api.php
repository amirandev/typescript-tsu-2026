<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ShareController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('change-password', [AuthController::class, 'changePassword']);

    Route::post('posts', [PostController::class, 'store']);
    Route::put('posts/{post}', [PostController::class, 'update']);
    Route::patch('posts/{post}', [PostController::class, 'update']);
    Route::delete('posts/{post}', [PostController::class, 'destroy']);

    Route::post('posts/{post}/like', [LikeController::class, 'like']);
    Route::delete('posts/{post}/like', [LikeController::class, 'unlike']);
    Route::post('posts/{post}/toggle-like', [LikeController::class, 'toggle']);

    Route::get('posts/{post}/comments', [CommentController::class, 'index']);
    Route::post('posts/{post}/comments', [CommentController::class, 'store']);
    Route::delete('posts/{post}/comments/{comment}', [CommentController::class, 'destroy']);

    Route::post('posts/{post}/share', [ShareController::class, 'store']);

    Route::post('friend-request/{user}', [FriendController::class, 'sendRequest']);
    Route::post('friend-request/{user}/accept', [FriendController::class, 'acceptRequest']);
    Route::delete('friend-request/{user}', [FriendController::class, 'rejectRequest']);
    Route::delete('friends/{user}', [FriendController::class, 'removeFriend']);
    Route::get('friends', [FriendController::class, 'friends']);
    Route::get('friend-requests/pending', [FriendController::class, 'pendingRequests']);
    Route::get('friend-requests/sent', [FriendController::class, 'sentRequests']);

    Route::get('users', [UsersController::class, 'index']);
    Route::get('users/{id}', [UsersController::class, 'show']);

    Route::get('profile', [AuthController::class, 'profile']);
    Route::get('timeline', [PostController::class, 'timeline']);
});

Route::get('posts', [PostController::class, 'index']);
Route::get('posts/{post}', [PostController::class, 'show']);
Route::get('posts/{post}/share-count', [ShareController::class, 'count']);
