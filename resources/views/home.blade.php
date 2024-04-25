<x-app-layout>
    {{-- <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot> --}}
<div class="bg-fixed bg-top bg-cover bg-blend-multiply" style=" background-color: rgb(0, 102, 102); background-image: url({{asset('images/jersey-bg.jpg')}});">
    <div class="text-center lg:text-start p-12 lg:p-48 text-gray-900 text-white">

        <h1 class="text-6xl font-Bebas lg:text-7xl font-bold mb-3">Unleash your inner beast with style.</h1>
        <p class="mb-3">This is JM Sportswear. Your number one sportswear apparel buddy.</p>
        <x-link href="/order-category" class="rounded-none" wire:navigate>Order Now</x-link>
    </div>
</div>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-black overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-20 text-gray-900 text-white">
                    <h1 class="text-7xl text-center lg:text-start font-bold">Unleash your inner beast with style.</h1>
                </div>
            </div>
        </div>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    {{ __("You're logged in!") }}
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
