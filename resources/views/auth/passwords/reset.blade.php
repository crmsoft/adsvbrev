@extends('layouts.auth')

@section('content')
<div class="login-register">
    <div class="d-flex">
        <div class="flex-fill brand d-flex align-items-center">
            <img src="/img/logo/logo.png" alt="">
        </div>
        <div class="flex-fill form-holder">
            <div id="login-register"></div>
        </div>
    </div>
</div>

@include('auth.footer')
@endsection
