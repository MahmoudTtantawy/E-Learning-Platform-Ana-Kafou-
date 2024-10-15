<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\User;
use Illuminate\Http\Request;
use Response;
use Validator;


class organizarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $organizar = User::whereIn('role_id', [2, 4])->whereNull('deleted_at')->get();
        return UserResource::collection($organizar);
    }

    public function getAllTeachers()
    {
        $teacher = User::whereIn('role_id', [2])->whereNull('deleted_at')->get();
        return UserResource::collection($teacher);
    }
    public function getTeacher($id){
        $teacher=User::whereIn('role_id', [2])->whereNull('deleted_at')->where('id', $id)->first();
        $courses=Course::where('instructor_id', $id)->get();
        $teacher->courses=$courses;
        return[
           'teacher'=> new UserResource($teacher),
            "courses_count"=> count($courses),
            "courses"=> $courses->map(function($course){
                return [
                    $course,
                'Student_count'=> count($course->students),
                ];
            })

        ];
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $organizarValidator = Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            "password_confirmation" => ['required'],
            'national_id' => ['required', 'digits:14', 'string', 'unique:users'],
            'gender' => ['required', 'string', 'in:Male,Female'],
            'image' => ['required', 'image'],
            'role_id' => ['required', 'in:Teacher,Moderator']

        ]);
        if ($organizarValidator->fails()) {
            return response()->json([
                'validation_errors' => $organizarValidator->errors(),
                'message' => 'Failed to store',

            ], 422);
        }
        if ($request->hasFile("image")) {
            $image = $request->file("image");
            $imagePath = $image->store("images", "user_image");
        }
        $role_id = $request->role_id === 'Teacher' ? 2 : ($request->role_id === 'Moderator' ? 4 : null);

        if (!$role_id) {
            return response()->json(['error' => 'Invalid role selected'], 400);
        }
        $data['image'] = $imagePath;

        $data['role_id'] = $role_id;

        $organizar = User::create($data);
        return [
            'message' => 'Organizer has been created successfully',
        ];
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

    $organizer = User::findOrFail($id);
    if ($organizer->role_id != 2 && $organizer->role_id != 4) {
        return response()->json([
            'error' => 'This user not teacher or moderator.'
        ], 403);
    }
    return new UserResource($organizer);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $organizar = User::findOrFail($id);
        $validator = Validator::make($request->all(), [
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'string', 'email', 'max:255', 'unique:users,email,' . $organizar->id],
            'national_id' => ['sometimes', 'digits:14', 'string', 'unique:users,national_id,' . $organizar->id],
            'gender' => ['sometimes', 'string', 'in:Male,Female'],
            'image' => ['sometimes', 'image',],
            // 'role_id' => ['sometimes', 'in:Teacher,Moderator'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->errors(),
                'message' => 'Failed to update',
            ], 422);
        }
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store("images", "user_image");
            $organizar->image = $imagePath;
        }

        if ($request->has('role_id')) {
            if ($request->role_id === 'Teacher') {
                $organizar->role_id = 2;
            } elseif ($request->role_id === 'Moderator') {
                $organizar->role_id = 4;
            } else {
                return response()->json(['error' => 'Invalid role selected'], 400);
            }
        }
        $organizar->fill($request->except(['image', 'role_id', 'password', 'password_confirmation']));
        $organizar->save();

        return response()->json([
            'data' => new UserResource($organizar),
            'message' => 'User has been updated successfully',
        ]);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $organizar = User::findOrFail($id);
        $organizar->delete();
        return response()->json([
            'message' => 'User has been soft deleted successfully',
        ]);

    }
     /**
     * Restore the specified resource from storage.
     */
    public function restore($id)
    {
        $organizar = User::withTrashed()->findOrFail($id);
        if ($organizar->trashed()) {
            $organizar->restore();
            return response()->json([
                'message' => 'User has been restored successfully',
            ]);
        }
        return response()->json([
            'message' => 'User is not deleted',
        ]);
    }

    public function trashed()
    {
        $trashedUsers = User::onlyTrashed()->get();
        return UserResource::collection($trashedUsers);
    }
}
