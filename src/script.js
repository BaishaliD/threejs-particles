import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.getElementById("three-canvas");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereGeometry(0.5, 64, 64);

//Texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("textures/NormalMap.png");
const image = textureLoader.load("textures/world.jpg");

// Materials
const material = new THREE.MeshStandardMaterial({
  color: "white",
  metalness: 0.75,
  roughness: 0.75,
  normalMap: texture,
  map: image
});
// material.color = new THREE.Color(0xff0000);
// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// const sphereMaterial = gui.addFolder("Material");
// sphereMaterial.add(sphere.material, 'metalness').min(0).max(1).step(0.01);
// sphereMaterial.add(sphere.material,'roughness').min(0).max(1).step(0.01);

/**
 * Lights
 */

//Pointlight 1 - white (intensity = 0.1)
const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

//Dat GUI
// const light = gui.addFolder("Light 1");
// light.add(pointLight.position, "x").min(-6).max(6).step(0.01);
// light.add(pointLight.position, "y").min(-3).max(3).step(0.01);
// light.add(pointLight.position, "z").min(-3).max(3).step(0.01);
// light.add(pointLight, "intensity").min(0).max(10).step(0.1);

/**
 * Pointlight 2
 */
const pointLight2 = new THREE.PointLight(0xff0000, 3.7);
pointLight2.position.set(1.1, 0.89, -0.1);
scene.add(pointLight2);

//Dat GUI
// const light2 = gui.addFolder("Light 2");
// light2.add(pointLight2.position, "x").min(-6).max(6).step(0.01);
// light2.add(pointLight2.position, "y").min(-3).max(3).step(0.01);
// light2.add(pointLight2.position, "z").min(-3).max(3).step(0.01);
// light2.add(pointLight2, "intensity").min(0).max(10).step(0.1);

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1);
// scene.add(pointLightHelper2);

/**
 * Pointlight 3
 */
const pointLight3 = new THREE.PointLight(0x7575, 4.5);
pointLight3.position.set(-1.26, -1.16, -0.43);
scene.add(pointLight3);

//Dat GUI
// const light3 = gui.addFolder("Light 3");
// light3.add(pointLight3.position, "x").min(-6).max(6).step(0.01);
// light3.add(pointLight3.position, "y").min(-3).max(3).step(0.01);
// light3.add(pointLight3.position, "z").min(-3).max(3).step(0.01);
// light3.add(pointLight3, "intensity").min(0).max(10).step(0.1);
// //Change color
// const light3color = {
//   color: 0x7575,
// };
// light3.addColor(light3color, "color").onChange(() => {
//   pointLight3.color.set(light3color.color);
// });

// const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1);
// scene.add(pointLightHelper3);

/**
 * Responsiveness on window resize
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
 * Rotation animation
 */

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth/2;
const windowHalfY = window.innerHeight/2;

const onMouseMove = (event) => {
  mouseX = (event.clientX - windowHalfX);
  mouseY = (event.clientY - windowHalfY);
}

const onScroll = (event) => {
  console.log("Sphere rad ::", sphere.scale.x);
  console.log("scroll position ::", (sizes.height/2 - window.scrollY) * 0.001);
  sphere.scale.x = 1 + (sizes.height/2 - window.scrollY) * 0.0001;
  sphere.scale.y = 1 + (sizes.height/2 - window.scrollY) * 0.0001;
  sphere.scale.z = 1 + (sizes.height/2 - window.scrollY) * 0.0001;
}

const clock = new THREE.Clock();

// Animate on mouse move
document.addEventListener('mousemove', onMouseMove);
window.addEventListener('scroll', onScroll);

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects

  //Constant rotation animation even if mouse is not moving...
  sphere.rotation.y = 0.5 * elapsedTime;

  //Animation on Mouse move
  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;
  
  sphere.rotation.x += 0.5*(targetY - sphere.rotation.x);
  sphere.rotation.y += 0.05*(targetX - sphere.rotation.y);
  sphere.rotation.z -= 0.05*(targetY - sphere.rotation.x);

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();


