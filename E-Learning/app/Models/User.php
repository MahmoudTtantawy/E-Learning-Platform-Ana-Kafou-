<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Payment;


class User extends Authenticatable
{
    use HasFactory, Notifiable;
    use HasApiTokens;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'national_id',
        'gender',
        'phone',
        'address',
        'image',
        'role_id',
        'title',
        'description',
    ];
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    protected $dates = ['deleted_at'];
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function tests()
    {
        return $this->belongsToMany(Test::class, 'scores');
    }

    public function answers()
    {
        return $this->hasMany(UserAnswer::class);
    }

    public function scores()
    {
        return $this->hasMany(Score::class);
    }
       
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
    public function course()
    {
        $this->belongsTo(Course::class);
    }

}