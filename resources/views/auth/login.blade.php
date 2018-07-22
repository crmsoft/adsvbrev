@extends('layouts.app')

@section('content')
<div class="container">
    @if(session('status'))
        <div class="alert alert-secondary" role="alert">
            {{ session('status') }}
        </div>
    @endif
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-3">
                            <span class="btn">
                                {{ __('Login') }}
                            </span>
                        </div>
                        <div class="col-9">
                            <div class="btn-group float-right">
                                <a class="btn btn-default" href="{{ route('login.with.social',['name' => 'github']) }}">Github</a>
                                <a class="btn btn-default" href="{{ route('login.with.social',['name' => 'twitter']) }}">Twitter</a>
                                <a class="btn btn-default" href="{{ route('login.with.social',['name' => 'facebook']) }}">Facebook</a>
                                <a class="btn btn-default" href="{{ route('login.with.social',['name' => 'twitch']) }}">Twitch</a>
                                <a class="btn btn-default" href="{{ route('login.with.social',['name' => 'google']) }}">Google+</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-body">
                    <form method="POST" action="{{ route('login') }}">
                        @csrf

                        <div class="form-group row">
                            <label for="email" class="col-sm-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required {{ old('email') ? '':'autofocus' }}>

                                @if ($errors->has('email'))
                                    <span class="invalid-feedback">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required {{ old('email') ? 'autofocus':'' }}>

                                @if ($errors->has('password'))
                                    <span class="invalid-feedback">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-md-6 offset-md-4">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> {{ __('Remember Me') }}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Login') }}
                                </button>

                                <a class="btn btn-link" href="{{ route('password.request') }}">
                                    {{ __('Forgot Your Password?') }}
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
