<x-app-layout>



    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="flex place-content-center">
            <h1 class="text-2xl rounded-md uppercase tracking-widest font-semibold text-center mb-3  p-4">Select an
                apparel</h1>
        </div>
        <div class="px-4 lg:px-0 columns-2 md:columns-3  h-full place-content-center">
            @foreach ($apparel as $apparel)
                <a href="/order/{{ $apparel->id }}" wire:navigate>
                    <x-card
                        class="mb-4 transition ease-in-out delay-150 hover:scale-105 hover:shadow-lg hover:shadow-teal-100 duration-300 break-inside-avoid-column">

                        @if ($apparel->product_name === 'Fullset Jersey')
                            <img class="rounded-t-lg" src="{{ asset('images/f1a8138bcaadd3f1b314363ad93a47cb.png') }}"
                                alt="Fullset Jersey">
                        @elseif($apparel->product_name === 'Upper Jersey')
                            <img class="rounded-t-lg" src="{{ asset('images/upper-jersey.jpg') }}" alt="Upper Jersey">
                        @elseif($apparel->product_name === 'Short')
                            <img class="rounded-t-lg" src="{{ asset('images/shorts.jpg') }}" alt="Short" >
                        @elseif($apparel->product_name === 'T-Shirt')
                        <img class="rounded-t-lg" src="{{ asset('images/tshirt.jpeg') }}" alt="TShirt" >
                        @elseif($apparel->product_name === 'Polo Shirt')
                        <img class="rounded-t-lg" src="{{ asset('images/polo.jpg') }}" alt="Polo Shirt" >
                        @elseif($apparel->product_name === 'Long Sleeve')
                        <img class="rounded-t-lg" src="{{ asset('images/longsleeve.jfif') }}" alt="Long Sleeve" >
                        @endif
                        <div class="p-5">
                        <div class="uppercase font-semibold tracking-widest text-xs flex justify-between">
                            <p>{{ $apparel->product_name }}</p>
                            <p class="text-lg font-bold tracking-wide">{{ $apparel->product_price }}.00</p>
                        </div>
                        </div>
                    </x-card>

                </a>
            @endforeach

</x-app-layout>
