<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Friendship;
use App\Models\Like;
use App\Models\Post;
use App\Models\Share;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $totalUsers = 50;
        $postsPerUser = 6;
        $avgLikesPerPost = 8;
        $avgCommentsPerPost = 4;
        $avgSharesPerPost = 3;
        $friendProbability = 0.15;

        $this->command->info("Creating demo accounts...");
        $demoAccounts = [
            ['name' => 'Alice Johnson',  'email' => 'alice@test.com',     'password' => 'password'],
            ['name' => 'Bob Smith',      'email' => 'bob@test.com',       'password' => 'password'],
            ['name' => 'Charlie Brown',  'email' => 'charlie@test.com',   'password' => 'password'],
            ['name' => 'Diana Prince',   'email' => 'diana@test.com',     'password' => 'password'],
            ['name' => 'Eve Adams',      'email' => 'eve@test.com',       'password' => 'password'],
            ['name' => 'Frank Castle',   'email' => 'frank@test.com',     'password' => 'password'],
            ['name' => 'Grace Hopper',   'email' => 'grace@test.com',     'password' => 'password'],
            ['name' => 'Hank Pym',       'email' => 'hank@test.com',      'password' => 'password'],
            ['name' => 'Ivy League',     'email' => 'ivy@test.com',       'password' => 'password'],
            ['name' => 'Jack Sparrow',   'email' => 'jack@test.com',      'password' => 'password'],
        ];

        foreach ($demoAccounts as $acct) {
            User::create([
                'name' => $acct['name'],
                'email' => $acct['email'],
                'password' => Hash::make($acct['password']),
            ]);
        }

        // Override first demo account as main test user
        User::where('email', 'alice@test.com')->update(['name' => 'Test Student', 'email' => 'student@test.com']);

        $this->command->info("Creating $totalUsers random users...");
        User::factory($totalUsers)->create();

        $userIds = User::pluck('id')->toArray();

        $this->command->info("Creating posts...");
        $posts = collect();
        foreach ($userIds as $userId) {
            for ($i = 0; $i < $postsPerUser; $i++) {
                $posts->push(Post::factory()->create(['user_id' => $userId]));
            }
        }
        $totalPosts = $posts->count();
        $postIds = $posts->pluck('id')->toArray();
        $this->command->info("  Created $totalPosts posts");

        $this->command->info("Creating likes...");
        $likePairs = [];
        foreach ($postIds as $postId) {
            $likers = (array) array_rand($userIds, min($avgLikesPerPost, $totalUsers));
            foreach ($likers as $likerIndex) {
                $likerId = $userIds[$likerIndex];
                $key = "$likerId-$postId";
                if (!isset($likePairs[$key])) {
                    $likePairs[$key] = true;
                }
            }
        }
        $batch = [];
        foreach ($likePairs as $key => $_) {
            [$uid, $pid] = explode('-', $key);
            $batch[] = ['user_id' => (int) $uid, 'post_id' => (int) $pid, 'created_at' => now(), 'updated_at' => now()];
        }
        Like::insert($batch);
        $this->command->info('  Created ' . count($batch) . ' likes');

        $this->command->info("Creating comments...");
        $commentsBatch = [];
        for ($p = 0; $p < $totalPosts; $p++) {
            $commenters = (array) array_rand($userIds, min($avgCommentsPerPost, $totalUsers));
            foreach ($commenters as $ci) {
                $commentsBatch[] = [
                    'user_id' => $userIds[$ci],
                    'post_id' => $postIds[$p],
                    'body' => fake()->paragraph(),
                    'created_at' => fake()->dateTimeBetween('-30 days', 'now')->format('Y-m-d H:i:s'),
                    'updated_at' => now()->format('Y-m-d H:i:s'),
                ];
            }
        }
        Comment::insert($commentsBatch);
        $this->command->info('  Created ' . count($commentsBatch) . ' comments');

        $this->command->info("Creating shares...");
        $sharesBatch = [];
        $platforms = ['facebook', 'twitter', 'whatsapp', 'telegram', null];
        for ($p = 0; $p < $totalPosts; $p++) {
            $sharers = (array) array_rand($userIds, min($avgSharesPerPost, $totalUsers));
            foreach ($sharers as $si) {
                $sharesBatch[] = [
                    'user_id' => $userIds[$si],
                    'post_id' => $postIds[$p],
                    'platform' => $platforms[array_rand($platforms)],
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }
        Share::insert($sharesBatch);
        $this->command->info('  Created ' . count($sharesBatch) . ' shares');

        $this->command->info("Creating friendships...");
        $friendBatch = [];
        for ($a = 0; $a < $totalUsers; $a++) {
            for ($b = $a + 1; $b < $totalUsers; $b++) {
                if (fake()->boolean($friendProbability * 100)) {
                    $friendBatch[] = [
                        'sender_id' => $userIds[$a],
                        'receiver_id' => $userIds[$b],
                        'status' => 'accepted',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }
        }
        Friendship::insert($friendBatch);
        $this->command->info('  Created ' . count($friendBatch) . ' friendships');

        $knownUser = User::first();
        $knownUser->update(['name' => 'Test Student', 'email' => 'student@test.com']);

        $this->command->info('');
        $this->command->info('--- Summary ---');
        $this->command->info("Users:       " . User::count());
        $this->command->info("Posts:       " . Post::count());
        $this->command->info("Likes:       " . Like::count());
        $this->command->info("Comments:    " . Comment::count());
        $this->command->info("Shares:      " . Share::count());
        $this->command->info("Friendships: " . Friendship::count());
        $this->command->info('');
        $this->command->info('--- Demo Accounts (all passwords: "password") ---');
        $this->command->info('  student@test.com  (Test Student)');
        $this->command->info('  alice@test.com    (Alice Johnson)');
        $this->command->info('  bob@test.com      (Bob Smith)');
        $this->command->info('  charlie@test.com  (Charlie Brown)');
        $this->command->info('  diana@test.com    (Diana Prince)');
        $this->command->info('  eve@test.com      (Eve Adams)');
        $this->command->info('  frank@test.com    (Frank Castle)');
        $this->command->info('  grace@test.com    (Grace Hopper)');
        $this->command->info('  hank@test.com     (Hank Pym)');
        $this->command->info('  jack@test.com     (Jack Sparrow)');
    }
}
