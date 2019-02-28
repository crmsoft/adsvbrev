@component('mail::message')

# {{ __('Hello, :user', [ 'user' => $user->first_name . ' ' . $user->last_name ]) }}

{{ __('You have new messages! Checkout!!!') }}

@component('mail::button', ['url' => route('profile-view'), 'color' => 'green'])
{{__('Check Profile')}}
@endcomponent

{{__('Thanks')}},<br>
{{ config('app.name') }}

@endcomponent