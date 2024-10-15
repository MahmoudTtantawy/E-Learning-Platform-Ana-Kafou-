<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Notifications\AdminPayment;
use App\Notifications\UserPayment;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use App\Models\Payment;
use App\Models\Enrollment;
use App\Models\Course;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;


class PaymentController extends Controller
{
    public function createPaymentIntent(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
        ]);
        $user = Auth::user();
        $course = Course::findOrFail($request->course_id);
        $amount = $course->price * 100;
        Stripe::setApiKey(env('STRIPE_SECRET_KEY'));
        try {
            $paymentIntent = PaymentIntent::create([
                'amount' => $amount,
                'currency' => 'usd',
                'metadata' => [
                    'user_id' => $user->id,
                    'course_id' => $course->id,
                ],
            ]);


            return response()->json([
                'clientSecret' => $paymentIntent->client_secret,
            ]);

        } catch (\Exception $e) {
            \Log::error('Stripe Payment Error: ' . $e->getMessage());
//            return response()->json(['error' => 'Failed to create payment intent.'], 500);
            return response()->json([$e->getMessage()]);
        }
    }
    public function storePayment(Request $request){
        $course = Course::find($request->course_id);
        $user=Auth::user();
        //Notification Data

        if ($request->status == 'succeeded') {
            DB::beginTransaction();

            $payment = Payment::create([
            'user_id' => $user->id,
            'course_id' => $request->course_id,
            'amount' => $request->amount,
            'payment_date' => now(),
        ]);
        $enrollment = Enrollment::create([
            'user_id' => $user->id,
            'course_id' => $request->course_id,
        ]);
            $admin = User::where('role_id', 1)->first();
            $username = $user->name;
            $userImage = $user->image;
            $courseTitle = $course->title;
            $created_at= $payment->created_at;
          Notification::send($admin,new AdminPayment($username,$userImage,$courseTitle,$created_at));
          Notification::send($user,new UserPayment($username,$userImage,$courseTitle,$created_at));

        DB::commit();
        return response()->json(['message' => 'Payment successful and user enrolled.',
            ], 200);
    }else{
        return response()->json(['error' => 'Payment failed.'], 400);
    }

    }
    public function getPayments()
    {
        $user = Auth::user();
        $payments = Payment::where('user_id', $user->id)->get();
        $courseIds = $payments->pluck('course_id')->toArray();
        $courses = Course::whereIn('id', $courseIds)->get();
        return response()->json(['payments' => $payments, 'courses' => $courses]);
    }
    public function getAllPayments(Request $request){
        $payments = Payment::with(['user', 'course'])->get();
        return response()->json([
            'payments' => $payments,
        ]);
    }
}
