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
    <link href="{{ asset('css/styles.css') }}" rel="stylesheet">
    <script type="text/javascript">
        var gg = {
            wsc: function(){
                return '{{session()->get('user_communication_id')}}';
            }
        }
    </script>
    @stack('scripts')
</head>
<body>

    <!-- Page Header -->
    {{--<header>
        <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
            <div class="container-fluid">
                <!-- Brand -->
                <a href="/" class="d-block">
                    <div class="d-inline-block">
                        <img src="/img/logo.png" class="logo" alt="gameglobe">
                    </div>
                    <div class="d-inline-block">
                        <h1 class="brand">
                            gameglobe
                        </h1>
                    </div>
                </a><!-- End Brand -->

                <!-- Small Screen Collapse -->
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button><!-- End Small Screen Collapse -->

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Search Form -->
                    <ul class="navbar-nav mx-auto">
                        <li>
                            <form class="my-3 my-lg-1 search-form" action="/search">
                                <input class="form-control mr-sm-3" name="q" type="search" placeholder="Search" aria-label="Search">
                                <div class="search-form-icon">
                                    <svg>
                                        <use xlink:href="/img/gg-sprite.svg#search"></use>
                                    </svg>
                                </div>
                            </form>
                        </li>
                    </ul><!-- End Search Form -->

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        @guest
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                            </li>
                        @else
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <svg>
                                    <use xlink:href="/img/gg-sprite.svg#strange"></use>
                                </svg>
                                <span class="nav-counter">
                                    4
                                </span>
                            </a>
                        </li>

                        <!-- Notifications -->
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <svg>
                                    <use xlink:href="/img/gg-sprite.svg#notifications"></use>
                                </svg>
                                <span class="nav-counter">
                                    4
                                </span>
                            </a>
                        </li><!-- End Notifications -->

                        <!-- Drop Down Menu -->
                        <li>
                            <div class="d-inline-block header-ava">
                                <img src="/img/default-ava.jpg" alt="">
                            </div>
                            <div class="dropdown d-inline-block">
                                <!-- Dropdown Trigger -->
                                <a href="#toggle-menu" class="user-menu" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <div class="d-block">
                                        <div class="d-inline-block">
                                            {{ Auth()->user()->name }}
                                        </div>
                                        <div class="d-inline-block arrow">
                                            <svg>
                                                <use xlink:href="/img/gg-sprite.svg#arrow-down"></use>
                                            </svg>
                                        </div>
                                    </div>
                                </a><!-- End Dropdown Trigger -->
                                <!-- Dropdown Content -->
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="nav-link" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
                                </div><!-- End Dropdown Content -->
                            </div>
                        </li><!-- End Drop Down Menu -->
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>
    </header><!-- End Page Header -->--}}

    <main>
        @yield('content')
    </main>


    <script src="{{mix('/js/manifest.js')}}"></script>
    <script src="{{mix('/js/vendor.js')}}"></script>
    <script src="{{mix('/js/app.js')}}"></script>
</body>
</html>
