<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use \App\Entities\Group;
use \App\Entities\UserGroup;
use App\Http\Resources\Group\GroupPage as GroupResource;

class GroupController extends Controller
{
    public function show(Group $group)
    {
        return new GroupResource($group);
    }

    public function join(Group $group)
    {
        $user = auth()->user();

        $userGroup = new UserGroup;
        $userGroup->user_id = $user->id;
        $userGroup->group_id = $group->id;
        $userGroup->save();
    }

    public function leave(Group $group)
    {
        $user = auth()->user();
        UserGroup::where('user_id', $user->id)->where('group_id', $group->id)->delete();
    }
}
