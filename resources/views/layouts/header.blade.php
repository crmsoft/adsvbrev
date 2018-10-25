<header>

    <nav class="navbar navbar-light navbar-expand-md bg-faded justify-content-center">
        <a href="/" class="navbar-brand d-flex w-50 mr-auto">
            <img src="/img/logo.png" alt="Logo" />
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar3">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse collapse w-100" id="collapsingNavbar3">
            <div class="navbar-nav w-100 justify-content-center nav-search">
                <form class="form-inline my-2 my-lg-0 w-100">
                    <span class="icon-search-icon"></span>
                    <input class="form-control mr-sm-2 w-100" type="search" placeholder="Search" aria-label="Search">
                </form>
            </div>
            <ul class="nav navbar-nav ml-auto w-100 justify-content-end">
                <li class="nav-item">
                    <span class="nav-item-count">5</span>
                    <a href="#asdc" class="nav-link icon-friend"></a>
                </li>
                <li class="nav-item">
                    <span class="nav-item-count">5</span>
                    <a href="#sacvsd" class="nav-link icon-notification"></a>
                </li>
                <li class="nav-item">

                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div class="d-flex">
                            <div class="header-ava">
                                <img src="{{ auth()->user()->profile->ava }}" alt="">
                            </div>
                            <div class="header-ava-text">
                                {{ auth()->user()->username }}
                            </div>
                        </div>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>


                </li>
            </ul>
        </div>
    </nav>

</header>