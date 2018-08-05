@extends('layouts.app')

@section('content')

    <div class="container">

        <div class="biography clearfix row">

            <!-- User Avatar -->
            <div class="d-inline-block ava">
                <img src="{{ $user->profile->ava }}"/>
            </div><!-- End User Avatar -->

            <!-- Short info -->
            <div class="d-inline-block user ml-3">
                <!-- User Name Surname -->
                <h2 class="name">{{ $user->full_name }}</h2>
                <!-- End User Name Surname -->
                <!-- User Progress Level -->
                <div class="user-level">
                    <div class="user-level-value" style="width: 72%;">72%</div>
                </div>
                <!-- End User Progress Level -->
                <div class="d-block">
                    Level 2
                </div>
                <!-- User Social Blocks -->
                <div class="d-block">

                    <div class="d-inline-block">
                        <a class="social" href="#">
                            <svg>
                                <use xlink:href="/img/gg-sprite.svg#twitch"></use>
                            </svg>
                        </a>
                    </div>

                    <div class="d-inline-block">
                        <a class="social" href="#">
                            <svg>
                                <use xlink:href="/img/gg-sprite.svg#youtube"></use>
                            </svg>
                        </a>
                    </div>

                    <div class="d-inline-block" href="#">
                        <a class="social" href="#">
                            <svg>
                                <use xlink:href="/img/gg-sprite.svg#steam"></use>
                            </svg>
                        </a>
                    </div>

                </div><!-- End User Socials Blocks -->
            </div><!-- End Short info-->

        </div>

    </div>

    <div class="container">

        <div class="row main-container">

            <div class="col-8">
                <div class="feed">

                    <div class="new-post-wrapper">
                        <div class="new-post-text">
                            Bir yazi gir...
                        </div>
                        <div class="post-actions">

                            <a class="d-inline-block mr-2" href="#">
                                <svg>
                                    <use xlink:href="/img/gg-sprite.svg#video-camera"></use>
                                </svg>
                            </a>

                            <a class="d-inline-block"  href="#">
                                <svg>
                                    <use xlink:href="/img/gg-sprite.svg#photo-camera"></use>
                                </svg>
                            </a>

                        </div>
                    </div>

                    <!-- Post -->
                    <div class="post clearfix">
                        <!-- Post Header -->
                        <div class="post-header clearfix">

                            <div class="d-inline-block post-avtor-ava">
                                <img src="/img/default-ava.jpg" alt="User Name">
                            </div>

                            <div class="d-inline-block ml-2">
                                <span class="post-avtor">Akhtem Veliliaiev</span>
                                <span class="post-time">7 minutes ago</span>
                            </div>

                            <div class="d-inline-block float-right">
                                <div class="d-block post-actions">

                                    <div class="d-inline-block  mr-2">

                                        <div class="d-block">
                                            <div class="d-inline-block">
                                                <a href="#">
                                                    <svg>
                                                        <use xlink:href="/img/gg-sprite.svg#heart"></use>
                                                    </svg>
                                                </a>
                                            </div>
                                            <div class="d-inline-block">
                                                <span class="like-count">5</span>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="d-inline-block">
                                        <div class="d-block">
                                            <div class="d-inline-block">
                                                <a href="#">
                                                    <svg>
                                                        <use xlink:href="/img/gg-sprite.svg#share"></use>
                                                    </svg>
                                                </a>
                                            </div>
                                            <div class="d-inline-block">
                                                <span class="share-count">5</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div><!-- End Post Header -->

                        <div class="post-body">
                            <p>
                                This is the game which never ends...
                            </p>
                            <div>
                                <img src="/img/profile.jpg" alt="Post Image">
                            </div>
                        </div>

                        <div class="post-footer">

                            <div class="new-comment clearfix">

                                <div class="gg-table">
                                    <div class="gg-cell ava-holder">
                                        <div class="d-inline-block">
                                            <div class="comment-ava">
                                                <img src="/img/default-ava.jpg" alt="">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="gg-cell">
                                        <div class="gg-table comment-input">
                                            <div class="gg-cell">
                                                <div class="new-post-text">
                                                    Bir yazi gir...
                                                </div>
                                            </div>
                                            <div class="gg-cell">
                                                <div class="actions">

                                                    <a class="d-inline-block mr-2" href="#">
                                                        <svg>
                                                            <use xlink:href="/img/gg-sprite.svg#video-camera"></use>
                                                        </svg>
                                                    </a>

                                                    <a class="d-inline-block"  href="#">
                                                        <svg>
                                                            <use xlink:href="/img/gg-sprite.svg#photo-camera"></use>
                                                        </svg>
                                                    </a>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>




                            </div>

                        </div>

                    </div><!-- End Post -->

                </div>
            </div>

            <div class="col-4">

                boxes

            </div>


        </div>


    </div>
@endsection
