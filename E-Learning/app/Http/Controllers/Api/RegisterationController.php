<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class   RegisterationController extends Controller
{
    public function Register(Request $request)
    {
        $data = $request->all();
        $registerValidator = Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            "password_confirmation" => ['required'],
            'national_id' => ['required', 'digits:14', 'string', 'unique:users'],
            'gender' => ['required', 'string', 'in:Male,Female'],
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:1000'],
        ]);

        if ($registerValidator->fails()) {
            return response()->json([
                'validation_errors' => $registerValidator->errors(),
                'message' => 'Failed to register',
            ], 422);
        }

        if ($request->hasFile("image")) {
            $image = $request->file("image");
            $imagePath = $image->store("images", "user_image");
        }

        $data['role_id'] = 3;
        $data['image'] = $imagePath;
        $data['password'] = Hash::make($request->password);
        $user = User::create($data);

        $token = $user->createToken($request->name);

        return [
            new UserResource($user),
            'message' => 'Registered successfully',
            'result' => true,
            'token' => $token->plainTextToken,
        ];
    }

    public function show($id)
    {
        $student = User::where('role_id', 3)->findOrFail($id);
        return new UserResource($student);

    }

    public function index()
    {
        $student = User::where('role_id', 3)->get();
        return response()->json(UserResource::collection($student), 200);

    }
    public function update(Request $request, $id)
    {
        $student = User::where('role_id', 3)->findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'string', 'email', 'max:255', 'unique:users,email,' . $student->id],
            'national_id' => ['sometimes', 'digits:14', 'string', 'unique:users,national_id,' . $student->id],
            'gender' => ['sometimes', 'string', 'in:Male,Female'],
            'image' => ['sometimes', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:1000'],
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
            $student->image = $imagePath;
        }

        $student->fill($request->except(['image', 'role_id', 'password', 'password_confirmation']));
        $student->save();

        return response()->json([
            'data' => new UserResource($student),
            'message' => 'User has been updated successfully',
        ]);
    }

    public function destroy($id)
    {
        $student = User::where('role_id', 3)->findOrFail($id);
        $student->delete();

        return response()->json([
            'message' => 'User has been soft deleted successfully',
        ]);
    }

    public function trashed()
    {
        $trashedStudents = User::onlyTrashed()->where('role_id', 3)->get();
        return UserResource::collection($trashedStudents);
    }
    public function restore($id)
    {
        $student = User::withTrashed()->where('role_id', 3)->findOrFail($id);
        if ($student->trashed()) {
            $student->restore();
            return response()->json([
                'message' => 'User has been restored successfully',
            ]);
        }
        return response()->json([
            'message' => 'User is not deleted',
        ]);
    }

    public function getScore($id){
        $student = User::find($id);
        $score = $student->scores;
        return response()->json($score, 200);

    }

    public function Login(Request $request)
    {
        $loginValidator = Validator::make($request->all(), [
            'email' => ['required', 'email', 'exists:users'],
            'password' => ['required', 'min:8'],
        ]);

        if ($loginValidator->fails()) {
            return response()->json([
                'validation_errors' => $loginValidator->errors(),
                'message' => 'Login Failed',
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid Password',
            ], 401);
        }

        $token = $user->createToken($user->name);

        return[
            'data' =>  new UserResource($user),
            'notifications'=>$user->notifications,
            'massage'=>'Login Successfully ',
            'result'=>true,
            'token' => $token->plainTextToken,
        ] ;
    }

    public function Logout(Request $request)
    {
        $user = $request->user();
        $user->tokens()->delete();
        return response()->json([
            'message' => 'Logged Out Successfully',
        ]);
    }
    public function forgetPassword(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email', 'exists:users'],
            'national_id' => ['required', 'digits:14', 'string', 'exists:users'],
            'password' => ['required', 'min:8'],
            'password_confirmation' => ['required', 'same:password'],
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->errors(),
                'message' => 'Failed to update',
            ], 422);
        }
        $user = User::where('national_id', $request->national_id)->first();
        $user->update([
            'password' => Hash::make($request->password),
        ]);
        return response()->json([
            'message' => 'Password has been updated successfully',
        ]);
    }
    public function getUserNotifications(Request $request){
        $user = Auth::user();
        return response()->json([
            "Notifications" => $user->fresh()->Notifications,
            "unReadNotificationsCount" => count($user->unreadNotifications),

            ],201);
    }
    public function readUserNotifications(){
        if (isset(\request()->all()['id'])){
            $id=\request()->all()['id'];
            $readable= Auth::user()->notifications;
            foreach ($readable as $read){
                if($read->id == $id){
                    $read->markAsRead();
                }
            }
        }

        return response()->json('success',201);
    }
}
