<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Course;
use Auth;
use Illuminate\Http\Request;
use Response;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Course $course)
    {
        return response()->json($course->comments()->with('user')->get(), 200);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request , Course $course)
    {
        // dd($request->input('body'));
        $comment = new Comment([
            'body' => $request->input('body'),
            'user_id' => Auth::id(), 
        ]);

        $course->comments()->save($comment);
        // dd($comment);
        return response()->json($comment, 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id , Course $course)
    {
        $comment = Comment::find($id);
        $comment->delete();
        return response()->json([
            // 'comment' => $comment,
            'message' => 'Comment deleted successfully'
            ] );
    }
}
