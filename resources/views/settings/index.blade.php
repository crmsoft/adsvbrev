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

                    <nav>
                        <ul class="nav nav-tabs">
                            <li class="active">
                                <a href="#">
                              <span class="icon-art">
                                  Profile
                              </span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="icon-play"> Authorization</span>
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <section class="content">

                        <form action="/settings.html">

                            <div class="row">
                                <div class="col content-bottom">
                                    <label for="">
                                        Change Your Password
                                    </label>
                                </div>
                                <div class="col">
                                    <div class="text-hint">hello wordl</div>
                                    <input class="input" type="password" value="huy">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <label for="">
                                        Email
                                    </label>
                                </div>
                                <div class="col">
                                    <input value="walter.white@gmail.com" class="input" type="email">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col content-top">
                                    <label for="">
                                        About you
                                    </label>
                                </div>
                                <div class="col">
                                <textarea name="asd" class="input">Walter Hartwell White Sr., also known by his clandestine alias Heisenberg, is a fictional character and the main protagonist of Breaking Bad. He is portrayed by Bryan Cranston. A chemistry honors graduate of the California Institute of Technology, Walt cofounded the company Gray Matter Technologies with his close friend Elliot Schwartz and his then-girlfriend Gretchen. He left Gray Matter abruptly, selling his shares for $5,000;[1][2] soon afterward, the company made a fortune, much of it from his research. Walt subsequently moved to Albuquerque, New Mexico, where he became a high school chemistry teacher. Breaking Bad begins on Walt's 50th birthday, when he is diagnosed with Stage IIIA lung cancer. After this discovery, he resorts to manufacturing methamphetamine and drug dealing to ensure his family's financial security after his death. He is pulled deeper into the illicit drug trade, becoming more and more ruthless as the series progresses, and later adopts the alias "Heisenberg", which becomes recognizable as the kingpin figure in the local drug trade. Series creator Vince Gilligan has described his goal with Walter White as "turning Mr. Chips into Scarface", and deliberately made the character less sympathetic over the course of the series. Walt's evolution from mild-mannered school teacher and family man to ruthless criminal mastermind and murderer is the show's central focus.
                                </textarea>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <label for="">
                                        Have you ever have a Nokia phone ? Or may be Samsung ?
                                    </label>
                                </div>
                                <div class="col">

                                    <label class="form-input-container">
                                        Yes
                                        <input type="checkbox" >
                                        <span class="checkmark"></span>
                                    </label>

                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <label for="">
                                        How much do you earn ?
                                    </label>
                                </div>
                                <div class="col">

                                    <label class="form-input-container">
                                        1000+
                                        <input type="radio" name="hazard">
                                        <span class="checkmark"></span>
                                    </label>

                                    <label class="form-input-container">
                                        2000+
                                        <input type="radio" name="hazard">
                                        <span class="checkmark"></span>
                                    </label>

                                    <label class="form-input-container">
                                        ∞
                                        <input type="radio" name="hazard">
                                        <span class="checkmark"></span>
                                    </label>

                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <label for="">
                                        Select Your Country
                                    </label>
                                </div>
                                <div class="col">
                                    <select name="abcd">
                                        <option value="0">Afganistan</option>
                                        <option value="1">Azerbeycan</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row submit-wrapper">

                                <input type="submit" class="btn btn-default">

                            </div>

                        </form>

                    </section>

                </section>

            </section>
        </div>

    </main>
@endsection