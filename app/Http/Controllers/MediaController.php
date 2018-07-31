<?php

namespace App\Http\Controllers;

use App\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->middleware(['auth']);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return array
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'media' => 'required|max:5000'
        ]);
        $user = $request->user();
        $stored = [];
        foreach ($request->file('media') as $image) {

            $url = self::putInStorage($image,640,360);

            $media = new Media;
            $media->path = $url;
            $media->user()->associate($user);
            $media->save();

            $stored[] = $url;
        } return $stored;
    }

    /**
     * put in public storage uploaded file.
     * @param $post_file
     * @param null $width
     * @param null $height
     * @return mixed
     */
    public static function putInStorage($post_file, $width = null, $height = null){

        $image = Image::make($post_file->getRealPath());
        $image->resize($width, $height, function($constraint){
            $constraint->aspectRatio();
            $constraint->upsize();
        });

        $image->stream();
        $name = hash('sha256', str_random() . $image) .'.'. $post_file->getClientOriginalExtension();

        Storage::disk('public')
            ->put("uploads/$name", $image);

        return Storage::url("uploads/$name");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
