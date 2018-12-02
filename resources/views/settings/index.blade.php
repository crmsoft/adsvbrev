@extends('layouts.app')

@section('content')

    <main class="container">

        <div class="d-flex"><!-- content wrapper -->

            @include('menu.index')

            <section class="user-middle"><!-- start user middle content -->

                <section class="user-settings">


                    <section class="header">
                        <h1>Settings</h1>
                        <img src="../img/settings-decor.png" alt="">
                    </section>

                    <div id="settings-content"></div>

                </section>

            </section>
        </div>

    </main>
@endsection