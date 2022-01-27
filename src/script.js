import "./style.css";
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { ids } from "webpack";

const canvas = document.getElementById('three-canvas');
// const gui = dat.GUI();

const sizes = {
    width: canvas.clientWidth,
    height: canvas.clientHeight
}

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    // alpha: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//Set renderer color
renderer.setClearColor(new THREE.Color(0x21282a));

const geometry = new THREE.TorusGeometry( 1, 0.2, 24, 100 );

const particlesGeometry = new THREE.BufferGeometry;
const particlesCount = 5000;

//create a Float32Array - a position array that defines the x,y,z coords of every particle
const posArray = new Float32Array(particlesCount*3);

//Populate the position array - with random numbers
for(let i = 0; i < particlesCount * 3; i++){
    posArray[i] = 5*(Math.random() - 0.5);
}

//Set the position attribute for each particle in the geometry
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const torusMaterial = new THREE.PointsMaterial( { color: '0x666666', size: 0.007 });

//Texture loader for using 'cross' particles instead of square (default)
const loader = new THREE.TextureLoader();
const cross = loader.load('./cross.jpg');

const particlesMaterial = new THREE.PointsMaterial( { size: 0.007, map: cross, transparent: true });

const torus = new THREE.Points( geometry, torusMaterial );
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)

scene.add( torus, particlesMesh );

//Mouse
let mouseX = 0;
let mouseY = 0;

const windowHalfX = window.innerWidth/2;
const windowHalfY = window.innerHeight/2;

const onMouseMove = (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
}

// Animate on mouse move
document.addEventListener('mousemove', onMouseMove);

function animate() {
	
	torus.rotation.y += 0.01;
    particlesMesh.rotation.y += 0.001;
    
    // if(mouseX > 0){
    //     particlesMesh.rotation.y = mouseX*0.0001;
    // }
    // if(mouseY > 0){
    //     particlesMesh.rotation.x = mouseY*0.0001;
    // }

	renderer.render( scene, camera );
    requestAnimationFrame( animate );
}
animate();

const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(2, 3, 4);

// scene.add(pointLight);

window.addEventListener("resize", () => {
    sizes.width = canvas.clientWidth;
    sizes.height = canvas.clientHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});