<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="apple-touch-icon" sizes="144x144" href="/fav/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/fav/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/fav/favicon-16x16.png">
    <link rel="manifest" href="/fav/site.webmanifest">
    <link rel="mask-icon" href="/fav/safari-pinned-tab.svg" color="#5bbad5">
    <link rel="shortcut icon" href="/fav/favicon.ico">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="msapplication-config" content="/fav/browserconfig.xml">
    <meta name="theme-color" content="#ffffff">


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
