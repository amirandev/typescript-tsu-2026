<?php

namespace App\Http\Controllers;

use OpenApi\Attributes as OA;

#[OA\Info(version: '1.0.0', title: 'Student API', description: 'API for students with authentication, posts, likes, comments, shares, and friends.')]
#[OA\Server(url: 'https://courses.xrow.asia/api', description: 'Production server')]
#[OA\SecurityScheme(securityScheme: 'bearerAuth', type: 'http', scheme: 'bearer', bearerFormat: 'JWT', description: 'Enter JWT token')]
#[OA\Tag(name: 'Auth', description: 'Authentication endpoints')]
#[OA\Tag(name: 'Posts', description: 'Post management')]
#[OA\Tag(name: 'Likes', description: 'Like/unlike posts')]
#[OA\Tag(name: 'Comments', description: 'Comment on posts')]
#[OA\Tag(name: 'Shares', description: 'Share posts')]
#[OA\Tag(name: 'Friends', description: 'Friend requests & management')]
#[OA\Tag(name: 'Users', description: 'User listing & search')]
abstract class Controller
{
    //
}
