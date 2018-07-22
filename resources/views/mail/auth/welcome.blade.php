@component('mail::message')

# {{ __('Welcome, :user', [ 'user' => $user->full_name ]) }}

{{ __('Your have registered and we ask you to proceed one more step!') }}

@component('mail::button', ['url' => route('account.validation', [ 'token' => $user->email_verification_token ]), 'color' => 'green'])
{{__('Validate Account')}}
@endcomponent

{{__('Thanks')}},<br>
{{ config('app.name') }}

@endcomponent