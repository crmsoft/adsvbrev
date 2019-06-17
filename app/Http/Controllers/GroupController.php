<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use \App\Entities\Group;
use \App\Entities\UserGroup;
use App\Http\Resources\Group\GroupPage as GroupResource;
use App\Http\Resources\Group\PrivateGroupResource;

class GroupController extends Controller
{
    /**
     * Check if user can request this group
     * 
     * @return bool
     */
    private static function can(Group $group)
    {
        $user = auth()->user();

        if (!$group->is_private)
        {
            return true;
        } // end if

        if ($group->managers()->where('users.id', $user->id)->count() > 0)
        {
            return true;
        } // end if

        if ($group->participants()->where('id', $user->id)->count() > 0)
        {
            return true;
        } // end if

        return false;
    }

    public function show(Group $group)
    {

        if(!self::can($group))
        {
            return response(new PrivateGroupResource($group), 403);
        } // end if

        return new GroupResource($group);
    }

    public function join(Group $group)
    {
        if(!self::can($group))
        {
            return response('f', 403);
        } // end if

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
