<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Media extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'path',
        'relation_id'
    ];

    protected $appends = [
        'full_path'
    ];

    /**
     * append full path to file
     * @return string
     */
    public function getFullPathAttribute(){
        return asset($this->path);
    }

    /**
     * the media created by the user
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(){
        return $this->belongsTo(User::class);
    }

    /**
     * the media could be belongs to some message
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function message(){
       return $this->belongsTo(Message::class, 'relation_id');
    }
}
