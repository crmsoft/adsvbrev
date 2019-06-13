<?php

namespace App\Http\Controllers\Profile;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

use App\Entities\Group;
use App\Http\Resources\Group\EditGroup;

class GroupManagerController extends Controller
{

    public function index(Group $group)
    {
        $user = auth()->user();

        if ($group->managers()->where('users.id', $user->id)->count() == 0)
        {
            return response(403);
        } // end if

        return new EditGroup($group);
    }

    public function update(Request $request)
    {
        
    }
}
