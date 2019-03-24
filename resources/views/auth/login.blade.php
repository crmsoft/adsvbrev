@extends('layouts.auth')

@section('content')
<div class="login-register">
    <div class="d-flex">
        <div class="flex-fill brand d-flex align-items-center">
            <img src="/img/logo/logo.png" alt="">
        </div>
        <div class="flex-fill form-holder">
            <div id="login-register"></div>
            <ul class="social-options">
                <li>
                    <a href="{{ route('login.with.social', ['twitch']) }}">
                        <img src="https://dev.twitch.tv/assets/favicon.ico" alt="Twitch">
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>
@endsection

@push('css')
    <style>
        .social-options{
            margin: 0;
            text-align: right;
        }
        .social-options li{
            list-style: none;
        }
        .social-options li a{
            padding: 7px 15px;
            background-color: #f05a24;
            border-radius: 5px;
        }
    </style>
@endpush
