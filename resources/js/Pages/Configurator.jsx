import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { fabric } from 'fabric';
import Stats from 'three/examples/jsm/libs/stats.module';

export default function Configurator({ auth, products }) {
    const canvasRef = useRef(null);
    const containerWidth = window.innerWidth / 2;
    const containerHeight = window.innerHeight;

    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current, { width: 1000, height: 1000, preserveObjectStacking: true });
        const baseColorPicker = document.getElementById('base-color-picker');
        const trimmingColorPicker = document.getElementById('trimming-color-picker');
        const sideColorPicker = document.getElementById('sides-color-picker');


         const setSvgObject = (svg) => {
        // Set the size of the SVG object
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const scaleX = canvasWidth / svg.width;
        const scaleY = canvasHeight / svg.height;
        const scaleToFit = Math.min(scaleX, scaleY);

        // Set the size of the SVG object to fit into the canvas
        svg.set({
            scaleX: scaleToFit,
            scaleY: scaleToFit,
            top: canvasHeight / 2 - svg.height * scaleToFit / 2,
            left: canvasWidth / 2 - svg.width * scaleToFit / 2,
            selectable: false
        });

        canvas.add(svg);
        canvas.sendToBack(svg);

        applyColorsToSvg("#00ffff", "#ff00ff", "#000000", svg);
        canvas.renderAll();
    };

    fabric.loadSVGFromURL('/texture-01.svg', function (objects, options) {
        const svg = fabric.util.groupSVGElements(objects, options);
        setSvgObject(svg);
    });

        const applyColorsToSvg = (baseColor, trimmingColor, sideColor, svg) => {
            if (svg) {
                svg.getObjects().forEach(function (object) {
                    if (object.id === 'BASE') {
                        object.set({ fill: baseColor });
                    } else if (object.id === 'TRIMMING') {
                        object.set({ fill: trimmingColor });
                    } else {
                        object.set({ fill: sideColor });
                    }
                });
                canvas.renderAll(); // Render canvas after applying colors
            } else {
                console.error('Error: SVG object not found.');
            }
        };

        const init = () => {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(50, containerWidth / containerHeight, 0.01, 1000);
            camera.position.z = 50;

            const container = document.getElementById("renderer");
            const renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true
            });
            renderer.setSize(containerWidth, containerHeight);
            container.appendChild(renderer.domElement);

            const ambientLight = new THREE.AmbientLight(0xffffff, 1);
            scene.add(ambientLight);

            const spotLight = new THREE.SpotLight(0xffffff, 1);
            spotLight.position.set(0, 0, 100);
            scene.add(spotLight);

            const texture = new THREE.Texture(document.getElementById("canvas"));
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

            const material = new THREE.MeshStandardMaterial({ map: texture });
            material.map.repeat.y = -1;
            material.map.offset.y = 1;

            const loader = new GLTFLoader();
            loader.load('/model/tshirt(4)/scene1.glb', function (gltf) {
                gltf.scene.position.set(0, 0, 0);
                gltf.scene.scale.set(0.3, 0.3, 0.3);
                gltf.scene.rotation.set(0, 0, 0);
                gltf.scene.traverse(child => {
                    if (child.isMesh) {
                        child.material = material;
                    }
                });
                scene.add(gltf.scene);
                console.log('3d Model loaded.');
            }, undefined, function (error) {
                console.error(error);
            });

            const controls = new OrbitControls(camera, renderer.domElement);
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
        };

        init();

        baseColorPicker.addEventListener('input', function () {
            applyColorsToSvg(baseColorPicker.value, trimmingColorPicker.value, sideColorPicker.value);
        });

        trimmingColorPicker.addEventListener('input', function () {
            applyColorsToSvg(baseColorPicker.value, trimmingColorPicker.value, sideColorPicker.value);
        });

        sideColorPicker.addEventListener('input', function () {
            applyColorsToSvg(baseColorPicker.value, trimmingColorPicker.value, sideColorPicker.value);
        });

        console.log(canvas.getObjects());
    }, []); // Empty dependency array ensures useEffect runs only once after initial render

    return (
        <div className='justify-start'>
            <div className="flex">
                <div id="renderer" style={{ width: '1000px', height: '1000px' }}></div>
                <canvas id='canvas' style={{ display: 'block' }} ref={canvasRef}></canvas>
            </div>
            <div className='p-4 border-2'>
                <div>
                    <input type="text" id="text-input" placeholder="Enter text" />
                    <button id="add-text-btn">Add Text</button>
                </div>
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
            </div>
        </div>
    );
}
