<footer class="text-center">
    <ul class="list-inline">
        <li class="list-inline-item">
            <a target="_blank" href="{{route('pages.terms')}}">
                {{__('Terms')}}
            </a>
        </li>
        <li class="list-inline-item">
            <a target="_blank" href="{{route('pages.privacy-policy')}}">
                {{__('Privacy policy')}}
            </a>
        </li>
        <li class="list-inline-item">
            <a target="_blank" href="{{route('pages.about')}}">
                {{__('about')}}
            </a>
        </li>
    </ul>
</footer>

@push('css')
    <style>
        footer{
            position: absolute;
            bottom: 0px;
            left: 0;
            right: 0;
            padding-top:10px;
            background-color: rgba(1,1,1,0.3);
        }

        footer ul {
            margin-bottom: 10px
        }

        footer ul li a {
            opacity: 0.5;
            color: rgb(240, 90, 36);
        }

        footer ul li a:hover {
            opacity: 1;
            color: rgb(240, 90, 36);
        }
    </style>
@endpush
