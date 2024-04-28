import React, { useState, useRef, useEffect } from 'react';
import { fabric } from 'fabric';
import PrimaryButton from './PrimaryButton';

function TShirtDesigner() {
    const frontCanvasRef = useRef(null);
    const backCanvasRef = useRef(null);
    const [frontCanvas, setFrontCanvas] = useState(null);
    const [backCanvas, setBackCanvas] = useState(null);
    const [text, setText] = useState('');
    const [color, setColor] = useState('#000000');
    const [view, setView] = useState('front');
    const [uploadedImage, setUploadedImage] = useState(null);

    useEffect(() => {
        const baseColorPicker = document.getElementById('base-color-picker');
        const trimmingColorPicker = document.getElementById('trimming-color-picker');
        const patternColorPicker = document.getElementById('pattern-color-picker');

        if (frontCanvas) {
            function applyColorsToSvg(color, text) {
                frontCanvas.getObjects().forEach(function (object) {
                    if (object.type === 'group') {
                        // Traverse the group objects
                        object._objects.forEach(function (innerObject) {
                            if (innerObject.id === text) {
                                innerObject.set({ fill: color });
                            }
                        });
                        frontCanvas.renderAll();
                    }
                });
            }

            baseColorPicker.addEventListener('input', function () {
                applyColorsToSvg(baseColorPicker.value, 'BASE');
            });
            patternColorPicker.addEventListener('input', function () {
                applyColorsToSvg(patternColorPicker.value, 'PATTERN');
            });

            trimmingColorPicker.addEventListener('input', function () {
                applyColorsToSvg(trimmingColorPicker.value, 'TRIMMING');
            });
        }
    }, [frontCanvas]);

    useEffect(() => {
        if (!frontCanvas) {
            const newFrontCanvas = new fabric.Canvas(frontCanvasRef.current, {
                width: 500,
                height: 500,
            });

            fabric.loadSVGFromURL('/model/FRONt-JERSEY.svg', function (objects, options) {
                const svg = fabric.util.groupSVGElements(objects, options);

                const canvasWidth = newFrontCanvas.width;
                const canvasHeight = newFrontCanvas.height;
                const scaleX = canvasWidth / svg.width;
                const scaleY = canvasHeight / svg.height;
                const scaleToFit = Math.min(scaleX, scaleY);

                svg.set({
                    scaleX: scaleToFit,
                    scaleY: scaleToFit,
                    top: canvasHeight / 2 - svg.height * scaleToFit / 2,
                    left: canvasWidth / 2 - svg.width * scaleToFit / 2,
                    selectable: false
                });

                newFrontCanvas.add(svg);
                newFrontCanvas.sendToBack(svg);
                newFrontCanvas.renderAll();
            });

            setFrontCanvas(newFrontCanvas);
        }

        if (!backCanvas) {
            const newBackCanvas = new fabric.Canvas(backCanvasRef.current, {
                width: 500,
                height: 500,
                backgroundColor: '#ffffff'
            });
            setBackCanvas(newBackCanvas);
        }
    }, [frontCanvas, backCanvas]);

    const handleColorChange = (e) => {
        setColor(e.target.value);
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            setUploadedImage(event.target.result);
        };
        reader.readAsDataURL(file);
    };

    const addText = (canvas) => {
        const newText = new fabric.Text(text, {
            left: 100,
            top: 100,
            fill: color
        });
        canvas.add(newText);
    };

    const addImage = (canvas) => {
        if (uploadedImage) {
            fabric.Image.fromURL(uploadedImage, function (img) {
                img.set({
                    left: 100,
                    top: 100
                });
                canvas.add(img);
            });
        }
    };

    const switchView = () => {
        setView(view === 'front' ? 'back' : 'front');
    };

    return (
        <div className="md:flex flex-row items-start">
            <h2 className="mb-4">{view === 'front' ? 'Front' : 'Back'} of T-Shirt</h2>
            <div className="bg-white p-4">
                <div style={{ display: view === 'front' ? 'block' : 'none' }}>
                    <canvas ref={frontCanvasRef} />
                </div>
                <div style={{ display: view === 'back' ? 'block' : 'none' }}>
                    <canvas ref={backCanvasRef} />
                </div>
            </div>
            <div className='flex flex-col'>
                <input type="color" value={color} onChange={handleColorChange} className="mr-2" />
                <input type="text" value={text} onChange={handleTextChange} className="mr-2" />
                <PrimaryButton onClick={() => addText(view === 'front' ? frontCanvas : backCanvas)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Add Text</PrimaryButton>
                <PrimaryButton onClick={() => addImage(view === 'front' ? frontCanvas : backCanvas)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Add Image</PrimaryButton>
                <PrimaryButton onClick={switchView} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Switch View</PrimaryButton>
            </div>
            <div>
                <label htmlFor="base-color-picker">Base Color:</label>
                <input type="color" id="base-color-picker" defaultValue="#00ffff" />
            </div>
            <div>
                <label htmlFor="pattern-color-picker">Pattern Color:</label>
                <input type="color" id="pattern-color-picker" defaultValue="#ffff00" />
            </div>
            <div>
                <label htmlFor="trimming-color-picker">Trimming Color:</label>
                <input type="color" id="trimming-color-picker" defaultValue="#ff00ff" />
            </div>
            <div>
                <label htmlFor="file-upload">Upload Image:</label>
                <input type="file" id="file-upload" accept="image/*" onChange={handleFileUpload} />
            </div>
        </div>
    );
}

export default TShirtDesigner;
