@extends('layouts.app')

@section('content')
<div class="container">

    <div class="row">

        @include('menu')

        <aside class="col-2">
            <div class="media">
                <img src="{{ $user->profile->ava }}" id="user_ava" alt="{{$user->name}} {{$user->last_name}}">
            </div>
            @if($user->id == Auth::user()->id)
                <div class="row">
                    <div class="col-12">
                        <button type="button" id="alter_avatar" class="btn btn-dark btn-block">
                            Change
                        </button>
                    </div>
                </div>
            @endif
        </aside>
        <main class="col-8">
            <div class="row user-heading">
                <div class="col-12">
                    {{ $user->full_name }}
                    <span class="float-right">
                        {{ $user->status ? 'online':'offline' }}
                    </span>
                </div>
                <div class="col-12">
                    <small>
                        Acemi nalbant kürt eşeğinde dener kendini.
                    </small>
                </div>
            </div>

            <div class="row user-heading mt-3">
                <div class="col-3">
                    Favorite Game
                </div>
                <div class="col-1">
                    :
                </div>
                <div class="col-6">
                    Tetris
                </div>
            </div>

            <div class="row user-heading">
                <div class="col-3">
                    Favorite Game
                </div>
                <div class="col-1">
                    :
                </div>
                <div class="col-6">
                    Tetris
                </div>
            </div>


        </main>
    </div>

</div>
@endsection
