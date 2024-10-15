<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = ['body', 'user_id'];

    // Polymorphic relationship
    public function commentable()
    {
        return $this->morphTo();
    }

    // Relationship to the user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
