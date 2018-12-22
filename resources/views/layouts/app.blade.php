<!DOCTYPE html>
<html lang="en">
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
    <link href="/front/styles.f4e41cb8.css" rel="stylesheet">
    <script type="text/javascript">
        var gg = {
            wsc: function(){
                return '{{ auth()->user()->jwt() }}';
            }
        }
    </script>
    @stack('scripts')
</head>
<body>

    <main>
        @include('layouts/header')
        @yield('content')
    </main>


    <script src="/front/src.7ed060e2.js"></script>
    {{--<script src="{{mix('/js/manifest.js')}}"></script>
    <script src="{{mix('/js/vendor.js')}}"></script>
    <script src="{{mix('/js/app.js')}}"></script>--}}
</body>
</html>
