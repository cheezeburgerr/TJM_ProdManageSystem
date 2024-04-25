
<x-app-layout>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class=" font-semibold mb-3 tracking-wide">
                <h1 class="text-4xl text-center md:text-left">{{$order->team_name}}</h1>
            </div>

            {{-- <p>{{$product->product_name}}</p> --}}
            <form class="relative overflow-x-auto  sm:rounded-lg" method="post" action="{{ route('lineup.submit', ['id' => $id]) }}">
                @csrf

                <div class="mb-3 sticky top-15 bg-light p-3">
                    <div class="row">
                        <div class="flex justify-between">
                            <div>
                                <p class="text-xs">{{$order->apparel}}</p>
                                <p class="text-xs">{{ \Carbon\Carbon::parse($order->due_date)->format('M d, Y') }}</p>
                            </div>
                            <div class="">
                                <x-secondary-button type="button" id="add_field">Add Row</x-secondary-button>
                                <x-primary-button type="submit" class="btn btn-primary">Submit</x-primary-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="input_fields" class="row scrollable card p-3">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead>
                            <tr>
                                <th class="">Name</th>
                                <th>Number/Position</th>
                                <th class="">Classification</th>
                                <th>Gender</th>
                                <th>Upper Size</th>
                                <th>Short Size</th>
                                <th>Short Name</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label="Name">
                                    <x-text-input class="w-full md:w-48" type="text" name="input[0][player_name]" placeholder="Name" required/>
                                </td>
                                <td data-label="Number">
                                    <x-text-input class="w-full md:w-36" type="text" name="input[0][player_details]" placeholder="Number"/>
                                </td>
                                <td data-label="Classification">
                                    <select class="w-full md:w-36" name="input[0][classification]" required>
                                        <option value="" disabled>Select Classification</option>
                                        <option value="Adult" selected>Adult</option>
                                        <option value="Kid">Kid</option>
                                    </select>
                                </td>
                                <td data-label="Gender">
                                    <select class="w-full md:w-36" name="input[0][gender]" id="age" required>
                                        <option value="" disabled>Select Gender</option>
                                        <option value="Male" selected>Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </td>
                                <td data-label="Upper Size">
                                    <x-text-input class="w-full md:w-36" type="text" name="input[0][upper_size]" placeholder="Upper Size"/>
                                </td>
                                <td data-label="Short Size">
                                    <x-text-input class="w-full md:w-36" type="text" name="input[0][short_size]" placeholder="Short Size"/>
                                </td>
                                <td data-label="Short Name">
                                    <x-text-input class="w-full md:w-36" type="text" name="input[0][short_name]" placeholder=""/>
                                </td>
                                <td>
                                    <button type="button" class="remove_field btn btn-dark btn-sm" onclick="removeRow(this)">Remove</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </form>

            </div>
        </div>
    </div>
    <script>
        // Function to add a new row
        function addRow() {
            var tableBody = document.querySelector("#input_fields tbody");
            var rowCount = tableBody.rows.length;

            // Create a new row
            var newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td data-label="Name">
                    <x-text-input class="w-full md:w-48" type="text" name="input[${rowCount}][player_name]" placeholder="Name" required/>
                </td>
                <td data-label="Number">
                    <x-text-input class="w-full md:w-36" type="text" name="input[${rowCount}][player_details]" placeholder="Number"/>
                </td>
                <td data-label="Classification">
                    <select class="w-full md:w-36" name="input[${rowCount}][classification]" required>
                        <option value="" disabled>Select Classification</option>
                        <option value="Adult" selected>Adult</option>
                        <option value="Kid">Kid</option>
                    </select>
                </td>
                <td data-label="Gender">
                    <select class="w-full md:w-36" name="input[${rowCount}][gender]" id="age" required>
                        <option value="" disabled>Select Gender</option>
                        <option value="Male" selected>Male</option>
                        <option value="Female">Female</option>
                    </select>
                </td>
                <td data-label="Upper Size">
                    <x-text-input class="w-full md:w-36" type="text" name="input[${rowCount}][upper_size]" placeholder="Upper Size"/>
                </td>
                <td data-label="Short Size">
                    <x-text-input class="w-full md:w-36" type="text" name="input[${rowCount}][short_size]" placeholder="Short Size"/>
                </td>
                <td data-label="Short Name">
                    <x-text-input class="w-full md:w-36" type="text" name="input[${rowCount}][short_name]" placeholder=""/>
                </td>
                <td>
                    <button type="button" class="remove_field btn btn-dark btn-sm" onclick="removeRow(this)">Remove</button>
                </td>
            `;

            // Append the new row to the table body
            tableBody.appendChild(newRow);
        }

        // Function to remove a row
        function removeRow(button) {
            var row = button.parentNode.parentNode;
            row.parentNode.removeChild(row);
        }

        // Event listener for the Add Row button
        document.getElementById("add_field").addEventListener("click", function() {
            addRow();
        });
    </script>
</x-app-layout>
