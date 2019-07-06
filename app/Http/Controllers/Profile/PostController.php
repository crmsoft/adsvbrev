<?php

namespace App\Http\Controllers\Profile;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

use App\Http\Controllers\Controller;
use App\Http\Resources\Post\ResourcePost;

use App\Post;

class PostController extends Controller
{

    public function index(Post $post)
    {
        return new ResourcePost($post);
    }
}