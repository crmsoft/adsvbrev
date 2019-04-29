<div class="col-md-4 col-sm-6">
    <div class="select-game-box">
        <div class="select-game-img">
            <div class="triangle-right"></div>
            <img src="{{ url(\Storage::url($game->ava)) }}" alt="{{ $game->name }}">
        </div>
        <div class="select-game-box-inside">
            <h3>{{ $game->name }}</h3>
            <p>{{ $game->developers->implode('name', ',') }} for {{ $game->platforms }}</p>
            <small>{{ $game->gamers->count() }} Gamers</small>
            <input class="orange-btn" type="submit" value="My Game" data-id="{{ \Hashids::encode($game->id) }}">
        </div>
    </div>
</div>