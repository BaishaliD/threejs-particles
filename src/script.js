import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
// const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
const geometry = new THREE.SphereGeometry(0.5, 64, 64);

//Texture
const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load("textures/ocean.jpeg");
const texture = textureLoader.load("textures/reflectorBump.jpg");

// Materials
const material = new THREE.MeshStandardMaterial({
  color: "gray",
  metalness: 0.7,
  roughness: 0.2,
  normalMap: texture,
});
// material.color = new THREE.Color(0xff0000);

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// /* GUI options */
// const guiOptions = {
//   mesh_material_map: "color",
// };

// /* Textures */
// const oceanTexture = textureLoader.load("textures/ocean.jpeg");
// const reflectorTexture = textureLoader.load("textures/reflectorBump.jpg");

// const guiTextureHash = {
//   ocean: oceanTexture,
//   refelctor: reflectorTexture,
// };

// /* Add to gui */
// gui
//   .add(sphere.material, "normalMap", Object.keys(guiTextureHash))
//   .onChange((value) => {
//     sphere.material.normalMap = guiTextureHash[value];
//     sphere.needsUpdate = true;
//     console.log("updated", value);
//   });

/**
 * Lights
 */

//Pointlight 1 - white (intensity = 0.1)
const pointLight = new THREE.PointLight(0xffffff, 0.2);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Pointlight 2
 */
const pointLight2 = new THREE.PointLight(0xff0000, 1.4);
pointLight2.position.set(1.13, 0.89, -0.54);
scene.add(pointLight2);

//Dat GUI
const light2 = gui.addFolder("Light 2");
light2.add(pointLight2.position, "x").min(-6).max(6).step(0.01);
light2.add(pointLight2.position, "y").min(-3).max(3).step(0.01);
light2.add(pointLight2.position, "z").min(-3).max(3).step(0.01);
light2.add(pointLight2, "intensity").min(0).max(10).step(0.1);

const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1);
scene.add(pointLightHelper2);

/**
 * Pointlight 3
 */
const pointLight3 = new THREE.PointLight(0x7575, 1.8);
pointLight3.position.set(-1.21, -1.13, -0.74);
scene.add(pointLight3);

//Dat GUI
const light3 = gui.addFolder("Light 3");
light3.add(pointLight3.position, "x").min(-6).max(6).step(0.01);
light3.add(pointLight3.position, "y").min(-3).max(3).step(0.01);
light3.add(pointLight3.position, "z").min(-3).max(3).step(0.01);
light3.add(pointLight3, "intensity").min(0).max(10).step(0.1);
//Change color
const light3color = {
  color: 0x7575,
};
light3.addColor(light3color, "color").onChange(() => {
  pointLight3.color.set(light3color.color);
});

const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1);
scene.add(pointLightHelper3);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.4 * elapsedTime;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
