@extends('layouts.app')

@section('content')
    
<div class="select-games-banner">
    <div class="banner-opacity"></div>
    <div class="banner-header">
        <div class="banner-titles">
            <h3>Choose the games you play!</h3>
            <h4>Find new dudes, be aware of events.</h4>
            <div class="banner-border">
                <hr/>
            </div>
        </div>
    </div>
    
    <form method="POST" action="{{ route('my-games.store') }}" style="position:absolute; right: 25px; bottom: 25px">
        @csrf
        <input type="hidden" id="selected" name="selected" />
        <button id="submit" type="submit" class="dd-btn btn-sm" {{ empty($my_games) ? 'disabled':NULL }}>
            {{ __('Submit') }}
            &nbsp;&nbsp;&nbsp;
            <span class="icon-ticke"></span>
        </button>
    </form>

    <img src="img/pubg.jpg" alt="">
</div>
<div class="search-games">
    <div class="select-game-container">
        <div class="row">
            <div class="col-md-3">
                <div class="games-selected">
                    <select id="genres">
                        <option value="any">Select Genre</option>
                        
                        @foreach ($genres as $genre)
                            <option value="{{ $genre->id }}">{{ $genre->name }}</option>
                        @endforeach
                        
                    </select>
                </div>
            </div>
            <div class="col-md-3">
                <div class="games-selected">
                    <select id="platform">
                        <option value="any">Select Platform</option>
                        @foreach ($platforms as $key => $platform)
                            <option value="{{ $key }}">{{ $platform }}</option>
                        @endforeach
                    </select>
                </div>
            </div>
            <div class="col-md-2">

            </div>
            <div class="col-md-4">
                <div class="games-search">
                    <div class="input-group flex-nowrap">
                        <div class="input-group-prepend">
                            <span class="input-group-text" ><i class="icon-search"></i></span>
                        </div>
                        <input id="search-input" type="text" placeholder="Search My games.." >
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

<div class="select-game-container">
    <div class="select-games-content">
        <div class="select-games-sort">
            <small >Sort by: </small>
            <small id="sort-a">Alphabetical <i class="fa fa-caret-down" aria-hidden="true"></i></small>
            <small id="sort-m">Most Played <i class="fa fa-caret-down" aria-hidden="true"></i></small>
            <small id="sort-n">New Additions <i class="fa fa-caret-down" aria-hidden="true"></i></small>
        </div>
        <div class="select-games-section">
            <div class="row" id="container">

                @foreach ($games as $game)
                    @include('my-games.partials.game')
                @endforeach

            </div>
        </div>


    </div>

</div>

<script type="html/template" id="game-template">
    <div class="select-game-box">
        <div class="select-game-img">
            <div class="triangle-right"></div>
            <img src="#img">
        </div>
        <div class="select-game-box-inside">
            <h3>#name</h3>
            <p>#devs</p>
            <small>#gamers Gamers</small>
            <input class="orange-btn" type="submit" value="My Game">
        </div>
    </div>
</script>
<script>
    let my_games = [{!! $my_games !!}];
</script>
<script src="/js/my-games.js"></script>
@endsection