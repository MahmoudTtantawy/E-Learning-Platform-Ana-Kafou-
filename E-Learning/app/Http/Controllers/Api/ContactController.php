<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\NotificationMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
class ContactController extends Controller
{
    public function sendContactMessage(Request $request)
    {
//        $validated = $request->validate([
//            'email' => 'required|email',
//            'message' => 'required',
//        ]);
        // Send an email with the user's message
        $details = [
            'title' => 'New Contact Message',
            'body' => $request->message
        ];

        Mail::to('omarabuelkhier.com')->send(new NotificationMail($details));


        return response()->json(['message' => 'Message sent successfully']);
    }
}
