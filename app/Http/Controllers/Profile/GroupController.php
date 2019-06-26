<?php

namespace App\Http\Controllers\Profile;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

use App\Http\Controllers\Controller;
use App\Http\Resources\Group\GroupCollection;
use App\Http\Resources\Group\ManagerGroup;

use App\Entities\Group;
use App\Entities\UserGroup;

class GroupController extends Controller
{

    /**
     * List user groups
     * 
     * @return GroupCollectionResource
     */
    public function index()
    {
        $user = auth()->user();
        
        $groups = Group::whereHas('managers', function($query) use ($user) {
            $query->where('user_id', $user->id);
        })->with('managers')->get();

        return (new GroupCollection($groups))->additional([
            'type' => 'manager'
        ]);
    }

    /**
     * Create new group
     * @param Request $request
     * 
     * @return Response
     */
    public function store(Request $request)
    {
        $slug = $request->get('name', '');

        $request->validate([
            'ava'           => ['required'],
            'cover'         => ['required'],

            'name'          => ['required', 'unique:groups,slug'],
            'description'   => ['required'],
            
            'related'       => ['required']
        ]);

        $user = auth()->user();

        $group = new Group;
        $group->slug = str_slug($slug);
        $group->name = $request->name;
        $group->options = [
            'description' => $request->description,
            'related' => collect(explode(',', $request->related))->map(function($id) {
                return \Hashids::decode($id)[0];
            }),
            'is_private' => $request->has('is_private')
        ];

        $group->save();

        $group->managers()->attach($user);

        // save avatar
        $media = $request->file('ava');

        $image = Image::make($media->getRealPath());

        $image->stream();
        $name = hash('sha256', str_random() . $image) .'.'. $media->getClientOriginalExtension();
        $users_dir = "groups/{$group->id}/";

        // profile main image;
        $image->fit(200);
        $image->stream();

        Storage::disk('public')
                    ->put("{$users_dir}/{$name}", $image);

        $group->ava = "public/{$users_dir}{$name}";

        // save poster
        $media = $request->file('cover');

        $image = Image::make($media->getRealPath());

        $image->stream();
        $name = hash('sha256', str_random() . $image) .'.'. $media->getClientOriginalExtension();
        $users_dir = "groups/{$group->id}";

        $image->fit(1110,250);
        $image->stream();

        Storage::disk('public')
                    ->put("{$users_dir}/{$name}", $image);

        $group->poster = "public/{$users_dir}/{$name}";

        $group->save();

        // admin automatically joins the group
        $u_group = new UserGroup;
        $u_group->user_id = $user->id;
        $u_group->group_id = $group->id;
        $u_group->save();

        return new ManagerGroup($group);
    }

    /**
     * Update group information
     *
     * @param Request $request
     * @param Group $group
     * 
     * @return Response
     */
    public function update(Request $request, Group $group)
    {
        $request->validate([
            'name'          => ['unique:groups,slug,'.$group->id],
            'description'   => ['min:15'],
            'related'       => ['min:1']
        ]);

        $user = auth()->user();

        $options = $group->options;

        if ($group->role == 'moderator' || $group->role == 'administrator')
        {
            if ($request->has('description'))
                $options['description'] = $request->description;
            
            if ($request->has('related'))
                $options['related'] = collect(explode(',', $request->related))->map(function($id) {
                    return \Hashids::decode($id)[0];
                });

            if ($request->has('is_private'))
                $options['is_private'] = $request->get('is_private') == 'true';

            if ($request->has('banned'))
            {
                UserGroup::where('group_id', $group->id)->where('status', 'banned')->update([
                    'status' => ''
                ]);
                $ban = explode(',', $request->get('banned'));
                foreach ($ban as $value) {
                    $user_ = $group->participants()->where('username', $value)->first();
                    if ($user_)
                    {
                        UserGroup::where('group_id', $group->id)->where('user_id', $user_->id)->update([
                            'status' => 'banned'
                        ]);
                    } // end if 
                }
            } // end if
        } // end if

        // the things that only admin can change
        if ($group->role == 'administrator')
        {
            if ($request->has('name'))
            {
                $group->slug = str_slug($request->name);
                $group->name = $request->name;
            } // end if

            if ($request->has('managers'))
            {
                $group->managers()->sync(
                    collect(explode(',', $request->get('managers')))->reduce(function($data, $username) use ($group) {
                        $user = \App\User::where('username', $username)->first();
                        if ($user)
                        {
                            try{
                                // automatically joins the group
                                $u_group = new UserGroup;
                                $u_group->user_id = $user->id;
                                $u_group->group_id = $group->id;
                                $u_group->save();
                            }catch(\Illuminate\Database\QueryException $e){}

                            $data[$user->id] = ['hierarchy' => 2];
                            return $data;
                        } // end if
        
                        return $data;
                    }, [$user->id => ['hierarchy' => 1]])
                );
            }
        } // end if

        $group->options = $options;

        $group->save();

        return response('ok', 200);
    }

    /**
     * Delete the group, only for admins
     * 
     * @param Group $group
     * @return Response
     */
    public function destroy(Group $group)
    {
        $user = auth()->user();

        if($group->role == 'administrator')
        {
            $group->delete();
            return response('ok', 200);
        }// end if

        return response('Forbidden', 403);
    }
}
