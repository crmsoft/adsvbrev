<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">

    <!-- Styles -->
    <link href="{{ asset('css/auth.css') }}" rel="stylesheet">

    @stack('css')
</head>
<body>

    <main>
        @yield('content')
    </main>


    <script src="{{asset('/js/manifest.js')}}"></script>
    <script src="{{asset('/js/vendor.js')}}"></script>
    <script src="{{asset('/js/auth.js')}}"></script>
</body>
</html>
