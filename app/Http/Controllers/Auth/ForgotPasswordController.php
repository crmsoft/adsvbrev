<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function sendResetLinkResponse($response)
    {
        if(request()->ajax()){
            return response()->json([
                'message' => __('We have send you an email with instructions. Please check your inbox!')
            ]);
        }

        return back()->with('status', trans($response));
    }

    public function sendResetLinkFailedResponse(Request $request, $response)
    {
        if($request->ajax()){
            return response()->json([
                'errors' => [
                    'email' => [trans($response)]
                ]
            ], 422);
        }

        return back()->withErrors(
            ['email' => trans($response)]
        );
    }
}
