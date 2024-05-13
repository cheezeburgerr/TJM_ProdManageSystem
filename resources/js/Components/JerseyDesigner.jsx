
import * as THREE from 'three';
import { useEffect, useState, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { fabric } from 'fabric';
import Stats from 'three/examples/jsm/libs/stats.module';
import { Card, Popover, Tabs, Button } from 'flowbite-react';
import { displayTextObjects, displayShapes, addText, loadSvg, uploadImage, displayImages, addRect, addCircle, draw, deleteSelectedObjects, changeText } from '@/Components/DesignerFunctions';
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
        document.getElementById('text-value').addEventListener('input', function () {
            var text = this.value;
            changeText(canvas, text);
        });


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

    const addSvgToCanvas = (svgUrl, color) => {

        console.log('rect clicked');
        // Set canvas selection mode to 'mouse' to enable selection
        canvas.selection = 'mouse';


        // Listen for click event to place the text
        canvas.on('mouse:down', function (event) {
            var pointer = canvas.getPointer(event.e);

            fabric.loadSVGFromURL(svgUrl, (objects, options) => {
                const obj = fabric.util.groupSVGElements(objects, options);
                obj.set({
                    left: pointer.x,
                    top: pointer.y,
                    scaleX: 0.1,
                    scaleY: 0.1,
                });
                obj.forEachObject(function (obj) {
                    console.log(obj);
                    obj.set('fill', color)

                });
                canvas.add(obj);
                canvas.off('mouse:down');
                canvas.renderAll();
            });
        });
    };

    const svgFiles = [
        '/designer/logos/nike.svg',
        '/designer/logos/adidas.svg',
        '/designer/logos/puma.svg',
        // Add more SVG file paths as needed
    ];

    const handleSvgClick = (svgUrl) => {
        addSvgToCanvas(svgUrl, selectedColor);
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

    return (
        <>
            <div className='p-12 bg-gray-300'>
                <div id="tools" className=' fixed top-24 left-5 flex gap-x-4 items-start'>
                    {/* <input type="color" id="set-color" /> */}
                    <div className={'rounded-md flex flex-col items-center bg-gray-100'}>
                        <div className="p-2">
                            <div onClick={handleColorButtonClick} className='h-5 w-5 border-1' style={{ backgroundColor: selectedColor }}></div>
                        </div>
                        <button id="rect-button" className='p-2'><svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
                            <rect width="15" height="15" fill="teal" />
                        </svg></button>
                        <button id="circle-button" className='p-2'><svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
                            <circle r="7.5" cx="7.5" cy="7.5" fill='teal' />
                        </svg></button>
                        <button id="draw-button" className='p-1'><Pencil color={'teal'} /></button>
                        <button id="draw-button" className='p-1'><Text color={'teal'} /></button>
                    </div>
                    {showColorPicker && (
                        <ChromePicker color={selectedColor} onChange={handleColorChange} />
                    )}
                </div>
                <div className="lg:flex items-start">

                    <div id="renderer" style={{ width: '800px', height: '512px' }}></div>
                    <div className='w-full rounded-none h-full'>
                        <div className="bg-gray-100 mb-4">
                            <Tabs aria-label="Full width tabs" style="fullWidth">
                                <Tabs.Item active title="Colors">


                                    <div className="p-4">
                                        <div id='colorPickerContainer' className='h-full'></div>
                                    </div>
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
                            </Tabs>
                        </div>

                        <>
                            <div className='p-4 bg-gray-100'>
                                <input type="text" id='text-value' />
                                <div>
                                    <InputLabel>Skew X</InputLabel>
                                    <input
                                        type="range"
                                        id="skewX"
                                        min="-10"
                                        max="10"
                                        step="0.1"
                                        value={skewX}
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
                                        onChange={handleSkewYChange}
                                    />
                                    <select id="fontSelect" value={selectedFont} onChange={handleFontChange}>
                                        <option value="Arial">Arial</option>
                                        <option value="Bebas">Bebas</option>
                                        <option value="Verdana">Verdana</option>
                                        <option value="Times New Roman">Times New Roman</option>
                                        {/* Add more font options as needed */}
                                    </select>
                                </div>
                            </div>

                        </>

                    </div>

                </div>

                <canvas id='canvas' style={{ display: 'none' }} ></canvas>
            </div>

        </>
    );


}
