@extends('layouts.app')

@section('content')

    <div class="container">

        <div class="row">

            @include('menu')

            <div class="col-10">
                <div id="conversation" class="direct-chat-messages">

                </div>
            </div>

        </div>

    </div>

@endsection