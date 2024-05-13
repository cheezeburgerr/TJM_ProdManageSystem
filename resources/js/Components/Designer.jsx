
import * as THREE from 'three';
import { useEffect, useState, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { fabric } from 'fabric';
import Stats from 'three/examples/jsm/libs/stats.module';
import { Card, Popover, Tabs, Button } from 'flowbite-react';
import { displayTextObjects, displayShapes, createColorPicker } from '@/Components/DesignerFunctions';
import TextInput from '@/Components/TextInput';
import PrimaryButton from './PrimaryButton';

export default function Configurator({ auth, products }) {




    const [svgObject, setSvgObject] = useState(null);
    const canvasRef = useRef(null);


    const containerWidth = 600;
    const containerHeight = 512;

    useEffect(() => {

        fabric.fonts = {
            'Bebas': {
              normal: 'Bebas',

            }
          };

        // Event listeners for color pickers
        const baseColorPicker = document.getElementById('base-color-picker');
        const trimmingColorPicker = document.getElementById('trimming-color-picker');
        const sideColorPicker = document.getElementById('sides-color-picker');


        const canvas = new fabric.Canvas('canvas', { width: 2000, height: 2000, preserveObjectStacking: true, selection: false });

        const loadJSONFile = async () => {
            try {
              const response = await fetch('/model/canvas2.json');
              const json = await response.json();
              canvas.loadFromJSON(json, () => {
                canvas.renderAll();
              });

              canvas.forEachObject(object => {
                if (object.type === 'group') {
                    console.log('Group ID:', object.id);
                    object.forEachObject(subObject => {
                        if (subObject.type === 'path') {
                            console.log('Path:', subObject.path);
                        }
                    });
                }
            });

            } catch (error) {
              console.error('Error loading JSON file:', error);
            }
          };

          loadJSONFile();

        // Rest of your code...



        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const onClickPosition = new THREE.Vector2();

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(50, containerWidth / containerHeight, 0.01, 1000);
        // camera.position.z = 50;
        camera.position.set(0, 0, 50);

        const container = document.getElementById("renderer");
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        renderer.setSize(containerWidth, containerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        var group = new THREE.Group();
        scene.add(group);

        camera.aspect = containerWidth / containerHeight;
        camera.updateProjectionMatrix();
        container.appendChild(renderer.domElement);

        var ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
        scene.add(ambientLight);

        var directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.castShadow = true; // White directional light
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);



        const texture = new THREE.Texture(document.getElementById("canvas"));
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        const material = new THREE.MeshStandardMaterial({ map: texture });

        material.map.repeat.y = -1;
        material.map.offset.y = 1;

        const axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);
        const loader = new GLTFLoader();

        loader.load('/model/tshirt(4)/scene1.glb', function (gltf) {
            gltf.scene.position.set(0, 0, 0);
            gltf.scene.scale.set(0.5, 0.5, 0.5);
            gltf.scene.rotation.set(0, -100, 0);
            gltf.scene.traverse(child => {
                if (child.isMesh) {
                    child.material = material;
                }
            })
            group.add(gltf.scene);
            console.log('3d Model loaded.')
        }, undefined, function (error) {
            console.error(error);
        });

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
        controls.minDistance = 25; // Adjust as needed
        controls.maxDistance = 50;

        // Load SVG content





        function applyColorsToSvg(color, text) {
            canvas.getObjects().forEach(function (object) {
                if (object.type === 'group') {
                    // Traverse the group objects
                    object._objects.forEach(function (innerObject) {
                        if (innerObject.id === text) {
                            innerObject.set({ fill: color });
                        }
                    });
                    canvas.renderAll();
                }
            });
        }


        // Function to apply colors to SVG based on color pickers


        const stats = Stats();
        document.body.appendChild(stats.dom);

        const animate = () => {
            stats.update();
            controls.update();

            window.requestAnimationFrame(animate);
            texture.needsUpdate = true;
            renderer.render(scene, camera);
        };





        animate();



        baseColorPicker.addEventListener('input', function () {
            applyColorsToSvg(baseColorPicker.value, 'BASE');
        });

        trimmingColorPicker.addEventListener('input', function () {
            applyColorsToSvg(trimmingColorPicker.value, 'TRIMMING');
        });

        sideColorPicker.addEventListener('input', function () {
            applyColorsToSvg(sideColorPicker.value, 'SIDES');
        });

        // Function to apply colors to SVG based on color pickers


        fabric.Canvas.prototype.getPointer = function (e, ignoreZoom) {
            console.log('BEG getPointer');
            if (this._absolutePointer && !ignoreZoom) {
                return this._absolutePointer;
            }
            if (this._pointer && ignoreZoom) {
                return this._pointer;
            }
            var pointer = fabric.util.getPointer(e),
                upperCanvasEl = this.upperCanvasEl,
                bounds = upperCanvasEl.getBoundingClientRect(),
                boundsWidth = bounds.width || 0,
                boundsHeight = bounds.height || 0,
                cssScale;

            if (!boundsWidth || !boundsHeight) {
                if ('top' in bounds && 'bottom' in bounds) {
                    boundsHeight = Math.abs(bounds.top - bounds.bottom);
                }
                if ('right' in bounds && 'left' in bounds) {
                    boundsWidth = Math.abs(bounds.right - bounds.left);
                }
            }
            this.calcOffset();
            pointer.x = pointer.x - this._offset.left;
            pointer.y = pointer.y - this._offset.top;
            /* BEGIN PATCH CODE */
            if (e.target !== this.upperCanvasEl) {
                var positionOnScene = getPositionOnScene(container, e);
                console.log('positionOnScene:', positionOnScene);
                pointer.x = positionOnScene.x;
                pointer.y = positionOnScene.y;
            }
            /* END PATCH CODE */
            console.log('pointer1:', pointer);
            if (!ignoreZoom) {
                pointer = this.restorePointerVpt(pointer);
            }

            if (boundsWidth === 0 || boundsHeight === 0) {
                cssScale = { width: 1, height: 1 };
            }
            else {
                cssScale = {
                    width: upperCanvasEl.width / boundsWidth,
                    height: upperCanvasEl.height / boundsHeight
                };
            }

            return {
                x: pointer.x * cssScale.width,
                y: pointer.y * cssScale.height
            };
        }

        container.addEventListener("mousedown", onMouseEvt, false);

        // Mouse event handler
        function onMouseEvt(evt) {
            evt.preventDefault();
            const positionOnScene = getPositionOnScene(container, evt);
            if (positionOnScene) {
                const canvasRect = canvas._offset;
                const simEvt = new MouseEvent(evt.type, {
                    clientX: canvasRect.left + positionOnScene.x,
                    clientY: canvasRect.top + positionOnScene.y
                });
                canvas.upperCanvasEl.dispatchEvent(simEvt);
            }
        }

        // Function to convert mouse coordinates to scene coordinates
        function getPositionOnScene(sceneContainer, evt) {
            const array = getMousePosition(sceneContainer, evt.clientX, evt.clientY);
            onClickPosition.fromArray(array);
            const intersects = getIntersects(onClickPosition, scene.children);
            if (intersects.length > 0 && intersects[0].uv) {
                const uv = intersects[0].uv;
                const canvasRect = canvas.upperCanvasEl.getBoundingClientRect();
                const realX = uv.x * canvasRect.width;
                const realY = uv.y * canvasRect.height;
                return {
                    x: getRealPosition('x', uv.x),
                    y: getRealPosition('y', uv.y),
                };
            }
            return null;
        }


        function getRealPosition(axis, value) {
            const CORRECTION_VALUE = axis === "x" ? 4.5 : 5.5;
            return Math.round(value * 2000) - CORRECTION_VALUE;
        }
        // Function to convert mouse coordinates to canvas coordinates
        function getMousePosition(dom, x, y) {
            const rect = dom.getBoundingClientRect();
            return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];
        }

        // Function to get intersection points
        function getIntersects(point, objects) {

            mouse.set(point.x * 2 - 1, -(point.y * 2) + 1);
            raycaster.setFromCamera(mouse, camera);
            return raycaster.intersectObjects(objects);
        }

        // Function to convert UV coordinates to real position


        // Event listener for fabric.js canvas object selection
        // canvas.on('selection:created', function () {
        //     // Disable OrbitControls when an object is selected
        //     controls.enabled = false;
        // });

        // // Event listener for fabric.js canvas object deselection
        // canvas.on('selection:cleared', function () {
        //     // Enable OrbitControls when no object is selected
        //     controls.enabled = true;
        // });

        console.log(canvas.getObjects());



        // Call the function to initially display text objects





        // Call the function to initially display shapes
        displayShapes(canvas);

        function addText() {
            var text = document.getElementById('text-input').value;
            if (text) {
                // Set canvas selection mode to 'mouse' to enable selection
                canvas.selection = 'mouse';

                // Listen for click event to place the text
                canvas.on('mouse:down', function (event) {
                    var pointer = canvas.getPointer(event.e);
                    var newText = new fabric.Text(text, {
                        left: pointer.x,
                        top: pointer.y,
                        fontFamily: 'Arial', // Change the font family as needed
                        fontSize: 20, // Change the font size as needed
                        fill: '#ffffff' // Change the text color as needed
                    });
                    canvas.add(newText);


                    // Remove event listener after placing the text
                    canvas.off('mouse:down');
                    displayTextObjects(canvas);
                    // Clear text input
                    document.getElementById('text-input').value = '';
                    canvas.renderAll();
                });
            }
        }

        function addRect() {
            // var text = document.getElementById('text-input').value;

                // Set canvas selection mode to 'mouse' to enable selection
                canvas.selection = 'mouse';

                // Listen for click event to place the text
                canvas.on('mouse:down', function (event) {
                    var pointer = canvas.getPointer(event.e);
                    var shape = new fabric.Rect({
                        left: pointer.x, // Half of rectangle width subtracted from canvas center
                        top: pointer.y, // Half of rectangle height subtracted from canvas center
                        fill: "#00ffff",
                        width: 100,
                        height: 100,
                        transparentCorners: false,
                        centeredScaling: true,
                    });

                    canvas.add(shape);


                    // Remove event listener after placing the text
                    canvas.off('mouse:down');

                    displayShapes(canvas);
                    // Clear text input
                    document.getElementById('text-input').value = '';
                });

        }

        document.getElementById('add-text-btn').addEventListener('click', addText);
        document.getElementById('rect-button').addEventListener('click', addRect);


        displayTextObjects(canvas);


        const saveAsJSON = () => {
            const canvass = canvas;
            const json = JSON.stringify(canvass.toJSON());

            canvass.getObjects().forEach(obj => {
                if (obj.type === 'group' && obj.id === 'ZONES') {
                  obj.selectable = false;
                }
              });
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

          document.getElementById('save-button').addEventListener('click', saveAsJSON);
        canvas.on("mouse:down", (e) => {

            if (e.target && e.target.text || e.target && e.target._element) {
                controls.enabled = false;
            } else {
                controls.enabled = true;
            }
        })

        console.log(canvas);
        canvas.on("selection:update", (e) => {
            controls.enabled = false;
        })
        canvas.on("mouse:up", (e) => {
            controls.enabled = true;
        })
        // Return cleanup function
        return () => {
            // container.removeEventListener("mousedown", onMouseEvt);
            material.dispose();
        };


        return () => {
            // Cleanup if necesmsary

        };
    }, []);

    const handleChangeColor = (value, text) => {
        console.log(value);
    }

    return (
        <>
            <div className='p-12'>
                <div className="lg:flex">
                    <div id="renderer" style={{ width: '600px', height: '512px' }}></div>
                    <Card className='w-full rounded-none'>
                        <Tabs aria-label="Full width tabs" style="fullWidth">
                            <Tabs.Item active title="Colors">
                                <button id="save-button">Save</button>
                                <div>
                                    <label htmlFor="base-color-picker">Base Color:</label>
                                    <input type="color" id="base-color-picker" defaultValue="#00ffff" />
                                </div>
                                <div>
                                    <label htmlFor="trimming-color-picker">Trimming Color:</label>
                                    <input type="color" id="trimming-color-picker" defaultValue="#ff00ff" />
                                </div>
                                <div>
                                    <label htmlFor="sides-color-picker">Sides Color:</label>
                                    <input type="color" id="sides-color-picker" defaultValue="#ffff00" />
                                </div>

                                <div id='colorPickerContainer' className='h-full'></div>
                            </Tabs.Item>
                            <Tabs.Item title="Text" >
                                <div className='flex gap-2 w-full'>
                                    <TextInput type="text" id="text-input" className='w-full' placeholder="Enter text" />
                                    <PrimaryButton id="add-text-btn" className='rounded-none'>Add Text</PrimaryButton>
                                </div>
                                <div className='p-4'>
                                    <p className="font-bold">Texts</p>
                                    <div id="textObjects"></div>
                                </div>
                            </Tabs.Item>
                            <Tabs.Item title="Objects" >
                                <div>
                                    <div className="w-full">

                                        <div className="float-right">
                                        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                                                          <button id="rect-button" className='p-4 border border-1'><svg width="25" height="25" xmlns="http://www.w3.org/2000/svg">
                                                            <rect width="25" height="25" fill="transparent" stroke='teal' stroke-width='1' />
                                                        </svg></button>
                                                        <button id="circle-button" className='p-4 border border-1'><svg width="25" height="25" xmlns="http://www.w3.org/2000/svg">
                                                            <circle r="12.5" cx="12.5" cy="12.5" stroke='teal' stroke-width='1' fill='transparent' />
                                                        </svg></button>

                                                    </div>
                                        </div>
                                    </div>

                                    <div id="shapes"></div>
                                </div>
                            </Tabs.Item>
                            <Tabs.Item title="Images" >
                                <TextInput type='file' id='upload-image' />
                                <PrimaryButton>Add</PrimaryButton>
                            </Tabs.Item>
                        </Tabs>

                    </Card>
                </div>

                <canvas id='canvas' style={{ display: 'none' }} ></canvas>
            </div>

        </>
    );


}
