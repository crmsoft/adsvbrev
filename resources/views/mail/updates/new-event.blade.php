@component('mail::message')

# {{ __('Hello, :user', [ 'user' => $user->first_name . ' ' . $user->last_name ]) }}

{{ __('Your friend just now created new event') }}

"{{ $event->name }}"

@component('mail::button', ['url' => route('event-page', $event->hash), 'color' => 'green'])
{{__('Show More')}}
@endcomponent

{{__('Thanks')}},<br>
{{ config('app.name') }}

@endcomponent