<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{
    /**
     * Display a listing of the courses.
     */
    public function index()
    {
        $courses = Course::all();
        return $courses;
    }

    /**
     * Store a newly created course in storage.
     */
    public function store(Request $request)
    {
        $courses=$request->all();

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required',
            'price' => 'required_if:is_free,false|integer|min:0',
            'is_free' => 'required|boolean',
            'instructor_id' => 'required|exists:users,id',
            'playlist_id' => 'required|exists:playlists,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $instructor = User::find($request->instructor_id);
        if ($instructor->role_id != 2) {
            return response()->json(['message' => 'You do not have permission to create courses.'], 403);
        }

        $course = Course::create([
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->is_free ? 0 : $request->price,
            'is_free' => $request->is_free,
            'instructor_id' => $request->instructor_id,
            'playlist_id' => $request->playlist_id,
            'thumbnail'=>$request->thumbnail
        ]);

        return response()->json($course, 201);
    }

    /**
     * Display the specified course.
     */
    public function show($id)
    {
        $course = Course::find($id);
        $enrollments = Enrollment::where('course_id', $id)->get();
        $course->enrollments = $enrollments;
        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        return response()->json($course, 200);
    }

    /**
     * Update the specified course in storage.
     */
    public function update(Request $request, $id)
    {
        $course = Course::find($id);

        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }


        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required',
            'price' => 'required_if:is_free,false|integer|min:0',
            'is_free' => 'sometimes|required|boolean',
            'instructor_id' => 'sometimes|required|exists:users,id',
            'playlist_id' => 'sometimes|required|exists:playlists,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $course->update($request->all());

        return response()->json($course, 200);
    }

    /**
     * Remove the specified course from storage.
     */
    public function destroy($id)
    {
        $course = Course::find($id);

        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        $course->delete();
        return response()->json(['message' => 'Course deleted successfully'], 200);
    }
}
