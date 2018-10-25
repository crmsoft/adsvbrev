@extends('layouts.app')

@section('content')

    <main class="container">

        <nav class="user-profile"><!-- .user -->
            <!-- cut the age of the cover -->
            <div class="triangle-right"></div>

            <div class="h-100">
                <div class="profile">
                    <div class="d-flex w-100">
                        <div class="ava-wrapper"><!-- AVA -->
                            <a href="#edit" class="icon-pencil"></a>
                            <div class="ava">
                                <img src="{{ $user->profile->ava }}" alt="">
                            </div>
                        </div><!-- END AVA -->
                        <div class="w-25">
                            <div class="user">
                                <h4>
                                    {{ $user->full_name }}
                                </h4>
                                <div class="user-level"><div class="user-level-progress" style="width: 80%">72%</div></div>
                                <div>
                                    <p class="user-level-value">Level 2</p>
                                </div>
                            </div>
                        </div>
                        <div class="w-25 user-about-wrapper">
                            <div class="user-about">
                                <p class="icon-location">Istanbul - Turkey</p>
                                <p class="icon-cake">July 24, 1985</p>
                            </div>
                        </div>
                        <div class="w-25 user-pc">
                            <div class="d-inline-block icon-pc"></div>
                            <div class="d-inline-block">
                                <p>asdc asdc asdcasdcsadc asd 45</p>
                            </div>
                        </div>
                        <div class="social-list-wrapper">
                            <ul class="social-list">
                                <li>
                                    <a href="#" class="icon-twitch"></a>
                                </li>
                                <li><a href="#" class="icon-yt"></a></li>
                                <li>
                                    <a href="#" class="icon-steam"></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </nav><!-- end .user -->

        <div class="d-flex"><!-- content wrapper -->

            <nav class="menu"><!-- start menu -->
                <ul>
                    <li>
                        <a class="active" href="#">
                            <span class="icon-profile"> my profile</span>
                        </a>
                    </li>
                </ul>
            </nav><!-- end menu -->


            <section class="user-middle"><!-- start user middle content -->

                <section class="user-uploads w-100"><!-- user media -->
                    <nav>
                        <ul class="nav nav-tabs">
                            <li class="active">
                                <a href="#">
                          <span class="icon-art">
                              Images
                          </span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="icon-play"> Videos</span>
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <div class="user-content active"><!-- image gallery -->
                        <div class="row">
                            <div class="col-4">
                                <img src="/img/sample-100.jpg" alt="">
                            </div>
                            <div class="col-4">
                                <img src="/img/sample-100.jpg" alt="">
                            </div>
                            <div class="col-4">
                                <img src="/img/sample-100.jpg" alt="">
                            </div>
                        </div>
                        <a href="#" class="user-content-all">All (14)</a>
                    </div><!-- end image gallery -->

                    <div class="user-content"><!-- video gallery -->
                        <div class="row">
                            <div class="col-4">
                                <img src="/img/sample-100.jpg" alt="">
                            </div>
                            <div class="col-4">
                                <img src="/img/sample-100.jpg" alt="">
                            </div>
                            <div class="col-4">
                                <img src="/img/sample-100.jpg" alt="">
                            </div>
                        </div>
                        <a href="#" class="user-content-all">All (0)</a>
                    </div><!-- end video gallery -->

                </section><!-- end user media -->

                <section class="user-add-post">
                    <form action="#">
                        <input type="text" placeholder="Speak to game world !" autofocus>
                        <div class="user-actions">
                            <a href="#" class="icon-video-cam"></a>
                            <a href="#" class="icon-photo-cam"></a>
                        </div>
                    </form>
                </section>

                <section class="posts"><!-- post container -->

                    <div class="post"><!-- start post -->
                        <div class="post-header">
                            <div class="post-author">
                                <div class="user-ava">
                                    <img src="/img/default-ava.jpg" alt="That's you !">
                                </div>
                                <div class="user-post-info">
                                    <h2>Akhtem Veliliaiev</h2>
                                    <span class="post-time">14.12.12</span>
                                </div>
                            </div>
                            <div class="post-author-meta">
                                <div class="like"><span class="icon-heart"></span> 45</div>
                                <div class="shares"><span class="icon-share"></span> 199</div>
                            </div>
                        </div>


                        <div class="post-text">
                            it could be buggy !
                        </div>

                        <div class="post-media">

                            <img src="/img/sample-1-100.jpg" alt="Media">

                        </div>

                        <div class="post-comments">

                            <div class="comment"><!-- user comment start -->
                                <div class="comment-user"><!-- comment user -->
                                    <a href="#">
                                        <img src="/img/default-ava.jpg" alt="Mehmet">
                                    </a>
                                </div><!-- end comment user-->
                                <div class="comment-container"><!-- comment contents -->
                                    <div class="comment-user-info">
                                        <a href="#">
                                            <h2>Ahmet Kaya</h2>
                                        </a>
                                        <span>20 seconds ago</span>
                                    </div>
                                    <div class="comment-content">
                                        text or image
                                    </div>
                                    <div class="comment-footer"><!-- comment footer -->
                                        <div class="share">
                                            <a href="#" class="icon-reply-to-comment"></a>
                                        </div>
                                        <div class="likes">
                                            <a href="">
                                                <span class="icon-heart-empty"></span>
                                                <span class="text">15</span>
                                            </a>
                                        </div>
                                    </div><!-- end comment footer -->
                                </div><!-- end comment contents -->
                            </div><!-- user comment end -->

                            <div class="see-all-comments">
                                <a href="#more">See all comments</a>
                            </div>

                            <div class="user-post-comment">
                                <div class="user">
                                    <a href="#">
                                        <img src="/img/default-ava.jpg" alt="Ahmet">
                                    </a>
                                </div>
                                <div class="comment-area">
                                    <input type="text" placeholder="Nice post ?">
                                    <div class="comment-actions">
                                        <a href="#" class="icon-video-cam"></a>
                                        <a href="#" class="icon-photo-cam"></a>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div><!-- end post -->

                </section><!-- end post container -->

            </section><!-- end user middle content -->

            <aside class="profile-aside"><!-- aside right -->

                <section class="block"><!-- Games -->
                    <div class="header">
                        <a href="#">
                            <span class="icon-gamepad"></span>
                            <h3>Games</h3>
                            <span class="items-count">(2)</span>
                        </a>
                    </div>

                    <div class="block-content">
                        <img src="/img/sample-game.jpg" alt="">
                    </div>

                </section><!-- End Game -->

                <section class="block"><!-- Groups -->
                    <div class="header">
                        <a href="#">
                            <span class="icon-groups"></span>
                            <h3>Groups</h3>
                            <span class="items-count">(6)</span>
                        </a>
                    </div>

                    <div class="block-content">
                        <div class="d-flex">
                            @foreach($user->group as $group)
                                <div class="m-1">
                                    <a href="#">
                                        <img src="/img/sample-group.jpg" alt="">
                                        <span class="item-title">{{ $group->name }}</span>
                                    </a>
                                </div>
                            @endforeach
                        </div>
                    </div>

                </section><!-- End Groups -->

                <section class="block"><!-- Turnament -->
                    <div class="header">
                        <a href="#">
                            <span class="icon-tournament"></span>
                            <h3>tournament</h3>
                            <span class="items-count">(2)</span>
                        </a>
                    </div>

                    <div class="block-content">
                        <a href="#">
                            <h4 class="item-title">Av asdc asdjk asdc</h4>
                            <div class="item-details">25 March, 2018 | 12:00 PM</div>
                            <time>7 days 23 hours</time>
                        </a>
                    </div>

                </section><!-- End Turnament -->

                <section class="block"><!-- Events -->
                    <div class="header">
                        <a href="#">
                            <span class="icon-event"></span>
                            <h3>events</h3>
                            <span class="items-count">(2)</span>
                        </a>
                    </div>

                    <div class="block-content">
                        <a href="#">
                            <h4 class="item-title">Av asdc asdjk asdc</h4>
                            <div class="item-details">25 March, 2018 | 12:00 PM</div>
                            <time>7 days 23 hours</time>
                        </a>
                    </div>

                </section><!-- End Events -->

                <section class="block"><!-- Events -->
                    <div class="header">
                        <a href="#">
                            <span class="icon-friends"></span>
                            <h3>friends</h3>
                            <span class="items-count">{{ $user->friend()->count() }}</span>
                        </a>
                    </div>

                    <div class="block-content">

                        <div class="friends">

                            @foreach($user->friend as $friend)

                                <a href="{{ route('user-profile', $friend->username) }}" class="friend">
                                    <img src="/img/sample-friend.jpg" alt="body">
                                    <h2>{{ $friend->username }}</h2>
                                </a>

                            @endforeach

                        </div>

                    </div>

                </section><!-- End Events -->

            </aside><!-- aside right -->

        </div><!-- end content wrapper -->


    </main>

@endsection
