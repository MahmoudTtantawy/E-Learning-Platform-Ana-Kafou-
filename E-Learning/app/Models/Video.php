<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;
    protected $table = 'videos';
    protected $fillable = ['video_id', 'title', 'description', 'thumbnail', 'playlist_id'];

    public function playlist()
    {
        return $this->belongsTo(Playlist::class,'playlist_id');
    }
}
