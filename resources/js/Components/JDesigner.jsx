
import * as THREE from 'three';
import { useEffect, useState, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { fabric } from 'fabric';
import Stats from 'three/examples/jsm/libs/stats.module';
import { Card, Popover, Tabs, Button } from 'flowbite-react';
import { displayTextObjects, displayShapes, addText, loadSvg, uploadImage, displayImages, addRect, addCircle, draw, deleteSelectedObjects, changeText, addSvgToCanvas, changeDesign } from '@/Components/DesignerFunctions';
import { init } from '@/Components/Load3D';
import TextInput from '@/Components/TextInput';
import PrimaryButton from './PrimaryButton';
import { Pencil, Text } from 'react-ionicons';
import { ChromePicker } from 'react-color';
import InputLabel from './InputLabel';

export default function JerseyDesigner({ auth, products }) {




    const [svgObject, setSvgObject] = useState(null);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const canvasRef = useRef(null);
    const [strokeColor, setStrokeColor] = useState('#ff00ff');
    const [strokeWidth, setStrokeWidth] = useState(0);
    const [showStrokeColorPicker, setShowStrokeColorPicker] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [selectedObject, setSelectedObject] = useState(null);
    const [canvas, setCanvas] = useState(null);
    const [skewX, setSkewX] = useState(0);
    const [skewY, setSkewY] = useState(0);
    const [selectedLogo, setSelectedLogo] = useState(null);
    const [selectedColor, setSelectedColor] = useState('#ffffff');
    const [selectedFont, setSelectedFont] = useState('Bebas');


    const containerWidth = 800;
    const containerHeight = 512;

    useEffect(() => {


        fabric.fonts = {
            'Bebas': {
                normal: 'Bebas',

            }
        };


        const canvas = new fabric.Canvas('canvas', { width: 2000, height: 2000, preserveObjectStacking: true, selection: false });

        setCanvas(canvas);

        canvas.on('selection:created', () => {
            setSelectedObject(canvas.getActiveObject());
        })

        canvas.on('selection:updated', () => {
            setSelectedObject(canvas.getActiveObject());
        })

        canvas.on('selection:cleared', (e) => {
            setSelectedObject(null);
        })

        const handleFileUpload = (file) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUploadedImage(event.target.result);
            };
            reader.readAsDataURL(file);

            console.log('hello');
        };

        document.getElementById('upload-image').addEventListener('change', (e) => {
            const file = e.target.files[0];
            handleFileUpload(file);
        });
        document.getElementById('add-button').addEventListener('click', () => {
            const fileInput = document.getElementById('upload-image');
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const reader = new FileReader();
                reader.onload = function (event) {
                    const imageUrl = event.target.result; // Get the data URL
                    uploadImage(canvas, imageUrl); // Pass the data URL to uploadImage
                };
                reader.readAsDataURL(file); // Read the file as data URL
            } else {
                // Handle case where no file is selected
                console.log('No file selected.');
            }
        });


        loadSvg(canvas);



        init(canvas, containerWidth, containerHeight);

        displayShapes(canvas);




        console.log(canvas.getObjects());
        console.log(JSON.stringify(canvas));
        document.getElementById('add-text-btn').addEventListener('click', function () {
            addText(canvas)
        });


        const handleChangeColor = (e) => {
            const color = e.target.value;
            const activeObjects = canvas.getActiveObjects();
            activeObjects.forEach(obj => {
                obj.set('fill', color);
            });
            canvas.renderAll();
        };

        // document.getElementById('set-color').addEventListener('input', handleChangeColor);


        displayTextObjects(canvas);
        displayImages(canvas);

        document.getElementById('rect-button').addEventListener('click', function () {
            addRect(canvas);
        });
        document.getElementById('circle-button').addEventListener('click', function () {
            addCircle(canvas);
        });
        document.getElementById('draw-button').addEventListener('click', function () {
            draw(canvas);
        });
        // document.getElementById('text-value').addEventListener('input', function () {
        //     var text = this.value;
        //     changeText(canvas, text);
        // });


        const saveAsJSON = () => {
            const canvass = canvas;
            const json = JSON.stringify(canvass.toJSON());

            // Create a blob from the JSON data
            const blob = new Blob([json], { type: 'application/json' });

            // Create a temporary anchor element
            const a = document.createElement('a');
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = 'canvas.json';

            // Click the anchor element to trigger the download
            a.click();

            // Cleanup
            window.URL.revokeObjectURL(url);
        };

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Delete') {
                deleteSelectedObjects(canvas);
            }
        });

        //   document.getElementById('save-button').addEventListener('click', saveAsJSON);
        // canvas.on("mouse:down", (e) => {

        //     if (e.target && e.target.text || e.target && e.target._element) {
        //         controls.enabled = false;
        //     } else {
        //         controls.enabled = true;
        //     }
        // })

        // canvas.on("selection:update", (e) => {
        //     controls.enabled = false;
        // })
        // canvas.on("mouse:up", (e) => {
        //     controls.enabled = true;
        // })
        // Return cleanup function
        return () => {
            // container.removeEventListener("mousedown", onMouseEvt);
            // material.dispose();
        };


        return () => {
            // Cleanup if necesmsary

        };
    }, []);



    const svgFiles = [
        '/designer/logos/nike.svg',
        '/designer/logos/adidas.svg',
        '/designer/logos/puma.svg',
        // Add more SVG file paths as needed
    ];

    const handleSvgClick = (svgUrl) => {
        addSvgToCanvas(svgUrl, selectedColor, canvas);
    };

    const handleColorChange = (color) => {
        setSelectedColor(color.hex);
        const activeObjects = canvas.getActiveObjects();
        activeObjects.forEach(obj => {
            if (obj.type === 'group') {
                obj.forEachObject(function (obj) {
                    console.log(obj);
                    obj.set('fill', color.hex)

                });
            }
            else {
                obj.set('fill', color.hex);
            }
        });
        canvas.renderAll();
    };

    const handleColorButtonClick = () => {
        setShowColorPicker(!showColorPicker);
    };

    const handleStrokeButtonClick = () => {
        setShowStrokeColorPicker(!showStrokeColorPicker);
    };

    const handleStrokeColorChange = (color) => {
        setStrokeColor(color.hex);
        const activeObjects = canvas.getActiveObjects();
        activeObjects.forEach(obj => {
            if (obj.type === 'group') {
                obj.forEachObject(function (obj) {
                    console.log(obj);
                    obj.set('stroke', color.hex)

                });
            }
            else {
                obj.set('stroke', color.hex);
            }
        });
    };

    const handleSkewXChange = (e) => {
        const value = parseFloat(e.target.value);
        setSkewX(value);
        skewSelectedObjects(value, skewY);
    };

    const handleSkewYChange = (e) => {
        const value = parseFloat(e.target.value);
        setSkewY(value);
        skewSelectedObjects(skewX, value);
    };


    const handleFontChange = (e) => {
        setSelectedFont(e.target.value);
        const activeObject = canvas.getActiveObject();
        console.log(activeObject);
        if (activeObject) {

            activeObject.set('fontFamily', e.target.value);
            canvas.requestRenderAll();
        }
    };
    const skewSelectedObjects = (skewX, skewY) => {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            activeObject.set('skewX', skewX);
            activeObject.set('skewY', skewY);
            canvas.requestRenderAll();
        }
    };



    const handleChangeDesign = (value) => {
        changeDesign(canvas, value);
    }
    const handleStrokeWidthChange = (e) => {
        const width = parseInt(e.target.value);
        setStrokeWidth(width);

        const activeObject = canvas.getActiveObject();

        if (activeObject) {
            activeObject.set('stroke', strokeColor)
            activeObject.set('strokeWidth', width);
            canvas.requestRenderAll();
        }
    };


    const setTheText = (e) => {
        setSelectedObject({ ...selectedObject, text: e });
        changeText(canvas, e);
    }
    return (
        <>
            <div className='p-12 bg-gray-300'>
                <div id="tools" className=' fixed top-24 left-5 flex gap-x-4 items-start'>
                    {/* <input type="color" id="set-color" /> */}
                    <div className={'rounded-md flex flex-col items-center bg-gray-100'}>
                        <div className="p-2">
                            <div onClick={handleColorButtonClick} className='h-5 w-5 border-1 cursor-pointer' style={{ backgroundColor: selectedColor }} title='Fill Color'></div>
                        </div>
                        <div className="p-2">
                            <div onClick={handleStrokeButtonClick} className='h-5 w-5 border-1 cursor-pointer' style={{ backgroundColor: strokeColor }} title='Stroke Color'></div>
                        </div>
                        <button id="rect-button" className='p-2 cursor-pointer'><svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" title='Rectangle Tool'>
                            <rect width="15" height="15" fill="teal" />
                        </svg></button>
                        <button id="circle-button" className='p-2 cursor-pointer'><svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" title='Circle Tool'>
                            <circle r="7.5" cx="7.5" cy="7.5" fill='teal' />
                        </svg></button>
                        <button id="draw-button" className='p-1 cursor-pointer' title='Draw'><Pencil color={'teal'} /></button>
                        <button id="draw-button" className='p-1 cursor-pointer'><Text color={'teal'} /></button>
                    </div>
                    {showColorPicker && (
                        <ChromePicker color={selectedColor} onChange={handleColorChange} />
                    )}
                    {showStrokeColorPicker && (
                        <ChromePicker color={strokeColor} onChange={handleStrokeColorChange} />
                    )}
                </div>
                <div className="lg:flex ">

                    <div id="renderer" style={{ width: '800px', height: '512px' }}></div>
                    <div className='w-full rounded-none h-full'>
                        <div className="bg-gray-100 mb-4">
                            <Tabs aria-label="Full width tabs" style="fullWidth">
                                <Tabs.Item active title="Properties">


                                    <div className="p-4">
                                        <div id='colorPickerContainer' className='h-full'></div>
                                    </div>
                                    {selectedObject ? (
                                        <>
                                            <div className='p-4 bg-gray-100'>
                                                {selectedObject.text != null && (
                                                    <div className="flex gap-x-2">
                                                        <TextInput type="text" id='text-value' className={'w-full'} value={selectedObject.text} onChange={(e) => setTheText(e.target.value)} />
                                                        <select id="fontSelect" className='rounded-md' value={selectedFont} onChange={handleFontChange}>
                                                            <option value="Arial">Arial</option>
                                                            <option value="Bebas">Bebas</option>
                                                            <option value="Verdana">Verdana</option>
                                                            <option value="Times New Roman">Times New Roman</option>
                                                            {/* Add more font options as needed */}
                                                        </select>
                                                    </div>
                                                )}
                                                <div style={{ marginTop: '20px' }}>
                                                    <label htmlFor="strokeWidth">Stroke Width:</label>
                                                    <input
                                                        type="number"
                                                        id="strokeWidth"
                                                        value={strokeWidth}
                                                        onChange={handleStrokeWidthChange}
                                                        min="0"
                                                    />
                                                </div>
                                                <div className='p-4'>
                                                    <InputLabel>Skew X</InputLabel>
                                                    <input
                                                        type="range"
                                                        id="skewX"
                                                        min="-10"
                                                        max="10"
                                                        step="0.1"
                                                        value={skewX}
                                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"

                                                        onChange={handleSkewXChange}
                                                    />
                                                    <InputLabel>Skew Y</InputLabel>
                                                    <input
                                                        type="range"
                                                        id="skewY"
                                                        min="-10"
                                                        max="10"
                                                        step="0.1"
                                                        value={skewY}
                                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                                        color='teal'
                                                        onChange={handleSkewYChange}
                                                    />

                                                </div>
                                            </div>
                                        </>
                                    ) : (

                                        <>
                                            <p className='text-center'>Select an object in the model.</p>
                                        </>
                                    )}

                                </Tabs.Item>
                                <Tabs.Item title="Text">
                                    <div className="p-4">
                                        <div className='flex gap-2 w-full'>
                                            <TextInput type="text" id="text-input" className='w-full' placeholder="Enter text" />
                                            <PrimaryButton id="add-text-btn" className='rounded-none w-1/4'>Add Text</PrimaryButton>
                                        </div>
                                        <div className='p-4'>
                                            <p className="font-bold">Texts</p>
                                            <div id="textObjects"></div>
                                        </div>
                                    </div>
                                </Tabs.Item>
                                <Tabs.Item title="Objects" >
                                    <div className='p-2'>

                                        <div id="shapes"></div>
                                    </div>
                                </Tabs.Item>
                                <Tabs.Item title="Images" >
                                    <TextInput type='file' id='upload-image' />
                                    <PrimaryButton id={'add-button'}>Add</PrimaryButton>
                                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {svgFiles.map((svgUrl, index) => (
                                            <div key={index} style={{ margin: '10px', cursor: 'pointer' }} onClick={() => handleSvgClick(svgUrl)}>
                                                <img src={svgUrl} alt={`SVG ${index}`} style={{ width: '100px', height: 'auto' }} />
                                            </div>
                                        ))}
                                    </div>
                                    <div id="images"></div>
                                </Tabs.Item>
                                <Tabs.Item title="Designs" >
                                    <button onClick={() => handleChangeDesign('/images/texture-01.svg')}>Change</button>

                                </Tabs.Item>
                            </Tabs>
                        </div>

                        <>


                        </>

                    </div>

                </div>

                <canvas id='canvas' style={{ display: 'none' }} ></canvas>
            </div>

        </>
    );


}
