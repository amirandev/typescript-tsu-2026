<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getJWTIdentifier(): mixed
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims(): array
    {
        return [];
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function sentFriendRequests()
    {
        return $this->hasMany(Friendship::class, 'sender_id');
    }

    public function receivedFriendRequests()
    {
        return $this->hasMany(Friendship::class, 'receiver_id');
    }

    public function friends()
    {
        $friendIds = Friendship::where(function ($q) {
            $q->where('sender_id', $this->id)->orWhere('receiver_id', $this->id);
        })->where('status', 'accepted')->get()->map(function ($f) {
            return $f->sender_id === $this->id ? $f->receiver_id : $f->sender_id;
        });

        return User::whereIn('id', $friendIds);
    }

    public function isFriendWith(User $user): bool
    {
        return Friendship::where(function ($q) use ($user) {
            $q->where('sender_id', $this->id)->where('receiver_id', $user->id);
        })->orWhere(function ($q) use ($user) {
            $q->where('sender_id', $user->id)->where('receiver_id', $this->id);
        })->where('status', 'accepted')->exists();
    }

    public function hasPendingFriendRequestFrom(User $user): bool
    {
        return Friendship::where('sender_id', $user->id)
            ->where('receiver_id', $this->id)
            ->where('status', 'pending')
            ->exists();
    }

    public function hasSentFriendRequestTo(User $user): bool
    {
        return Friendship::where('sender_id', $this->id)
            ->where('receiver_id', $user->id)
            ->where('status', 'pending')
            ->exists();
    }
}
