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
                                    <button onclick="return sent_message(this)" class="btn btn-default float-right">
                                        <input type="hidden" value="{{ $r_user->unique }}" name="start-with"/>
                                        Message
                                    </button>
                                </div>
                            </div>
                        </li>
                    @endforeach
                </ul>

            </div>

        </div>

    </div>

@endsection

@push('scripts')

    <script>

        function sent_message(btn) {
            var message = prompt('Enter your message');

            if (message) {

                axios.post('conversations', {
                    "unique": $('input',btn).val(),
                    "message": message
                })
                    .then(function () {
                        alert('Your message has been sent !')
                    });

            } return false;
        }

    </script>

@endpush