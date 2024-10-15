<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\NotificationMail;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;


class SubscriptionController extends Controller
{
    public function subscribe(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:subscribers,email',
        ]);
        $email = $request->input('email');

        Subscriber::create([
            'email' => $validated['email'],
        ]);

        $details = [
            'title' => 'Subscription Successful',
            'body' => 'Thank you for subscribing to our newsletter!'
        ];


        Mail::to($email)->send(new NotificationMail($details));

        return response()->json(['message' => 'Subscription successful']);
    }
}
