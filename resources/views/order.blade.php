<x-app-layout>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class=" font-semibold mb-3 tracking-wide">
                <h1 class="text-4xl text-center md:text-left">Order</h1>
            </div>

            {{-- <p>{{$product->product_name}}</p> --}}
                    <livewire:OrderForm :products="$product"/>

            </div>
        </div>
    </div>
</x-app-layout>
