@extends('layouts.app')


@section('content')

    <div class="container">

        <div class="row">

            @include('menu')

            <div class="col-10">
                <ul class="nav">
                    <li class="nav-item">
                        <a class="nav-link active" href="#">Users</a>
                    </li>
                </ul>

                <ul>
                    @foreach($users as $r_user)
                        @if($user->id == $r_user->id)
                            @continue
                        @endif
                        <li>
                            <div class="row">
                                <div class="col-6">
                                    <a href="{{route('show-user-profile',[ 'unique' => $r_user->unique ])}}">
                                        {{ $r_user->name }} {{ $r_user->last_name }}
                                    </a>
                                </div>
                                <div class="col-6">
                                    <form action="{{ route('start-conversation') }}" method="post" style="display: inline">
                                        {{ csrf_field() }}
                                        <input type="hidden" value="{{ $r_user->unique }}" name="start-with"/>
                                        <button class="btn btn-default float-right">
                                            Message
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </li>
                    @endforeach
                </ul>

            </div>

        </div>

    </div>

@endsection