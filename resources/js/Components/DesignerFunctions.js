import { color } from "three/examples/jsm/nodes/shadernode/ShaderNode";

export function hello() {
    return (
        console.log('this is from my outside')
    )
}


export function createColorPicker(obj, canvas) {

    if(obj.id !== 'BG') {
        var colorPickerId = 'colorPicker_' + obj.id;
    var colorContainer = document.createElement('div');
    colorContainer.classList.add('w-full');
    var colorPickerInput = document.createElement('input');
    colorPickerInput.classList.add('me-4');
    colorPickerInput.type = 'color';
    var colorText = document.createElement('span');
    colorText.classList.add('me-4');
    colorText.textContent = obj.id;
    colorPickerInput.id = colorPickerId;
    colorPickerInput.value = obj.fill;
    const cont = document.getElementById('colorPickerContainer');

    colorContainer.appendChild(colorPickerInput);
    colorContainer.appendChild(colorText);


    cont.appendChild(colorContainer);

    // Listen for color changes and update canvas
    colorPickerInput.addEventListener('input', function() {
        var newColor = this.value;
        obj.set('fill', newColor);
        canvas.renderAll();
    });
    }
}

export function displayShapes(canvas) {
    var shapesDiv = document.getElementById('shapes');
    shapesDiv.innerHTML = ""; // Clear previous content

    canvas.getObjects().forEach(function(object, index) {

        // Create a div to hold each shape and its delete button
        if (object.type !== 'text' && object.type !== 'i-text') {
            // Create a div to hold each shape and its delete button
            var shapeDiv = document.createElement('div');
            shapeDiv.classList.add('flex', 'items-center', 'mb-2', 'w-full', 'bg-teal-100', 'border-2', 'border-teal-500', 'p-2', 'hover:bg-gray-100');
            // Display shape type
            var shapeType = document.createElement('span');
            shapeType.textContent = object.type;
            shapeType.classList.add('font-bold', 'w-full');
            shapeDiv.appendChild(shapeType);

            // Create a delete button
            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('font-bold', 'px-2', 'py-1', 'rounded', 'ml-2');
            deleteButton.onclick = function() {
                canvas.remove(object);
                displayShapes(canvas); // Update the displayed shapes after deletion
            };
            shapeDiv.appendChild(deleteButton);

            shapesDiv.appendChild(shapeDiv);
        }
    });
}

export function displayTextObjects(canvas) {
    var textObjectsDiv = document.getElementById('textObjects');
    textObjectsDiv.innerHTML = ""; // Clear previous content


    // console.log(canvas)
    canvas.getObjects().forEach(function(object, index) {


        if (object.type === 'text' || object.type === 'i-text') {
            var textContent = object.text;

            // Create a container div to hold text and delete button
            var containerDiv = document.createElement('div');
            containerDiv.classList.add('flex', 'items-center', 'mb-2', 'w-full', 'bg-teal-100', 'border-2', 'border-teal-500', 'p-2', 'hover:bg-gray-100'); // Add Tailwind classes for styling

            // Create span for text
            var textNode = document.createElement('span');
            textNode.textContent = textContent;
            textNode.classList.add('font-bold', 'w-full'); // Add Tailwind classes for styling
            containerDiv.appendChild(textNode);

            // Create a delete button
            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function() {

                canvas.remove(object);
                canvas.requestRenderAll();
                displayTextObjects(canvas); // Update the displayed text objects after deletion
            };
            deleteButton.classList.add('font-bold', 'px-2', 'py-1', 'rounded', 'ml-2'); // Add Tailwind classes for styling
            containerDiv.appendChild(deleteButton);

            textObjectsDiv.appendChild(containerDiv);
        }
    });
}
