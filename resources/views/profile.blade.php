@extends('layouts.app')

@section('content')
<div class="container">

    <div class="row">

        @include('menu')

        <aside class="col-2">
            <div class="media">
                <img src="http://via.placeholder.com/160/95a/fff?text={{ $user->name }}" alt="{{$user->name}} {{$user->last_name}}">
            </div>
            <div class="row">
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-block">
                        Change
                    </button>
                </div>
            </div>
        </aside>
        <main class="col-8">
            <div class="row user-heading">
                <div class="col-12">
                    {{ $user->name }} {{ $user->last_name }}
                    <span class="float-right">
                        online
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
