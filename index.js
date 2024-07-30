import * as THREE from "three";
import {OrbitControls} from "jsm/controls/OrbitControls.js";

//needs three thing for doing something
//renderer
//camera
//scene obj

//*********************making the canvas renderer*********************
//renderer
//property is - antialias: true means it will look more better
const renderer = new THREE.WebGLRenderer({antialias: true})

//set the size of renderer
//take window width and height

const w = window.innerWidth;
const h = window.innerHeight;
renderer.setSize(w,h);

//now convert the renderer to domElement and append to body

document.body.appendChild(renderer.domElement)

//*********************canvas done*********************





//*********************making the camera(perspective)*********************

//fov - field of view. Default 50
//aspect - Camera frustum aspect ratio Default 1
//near - Camera frustum near plane Default 0.1
//far - Camera frustum far plane Default 2000

const fov = 75
//75 means 75 degress view angle
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

//now we want the camera to move 2 units away from the center
camera.position.z = 2;

//*********************camera done*********************





//*********************making the scene object*********************

const scene = new THREE.Scene();

//*********************scene done*********************





//*********************making the geometry*********************

//                        create mesh

//need two things 
//1. geometry
//2. material

//three js has some premitive geometry that we can use
//use IcosahedronGeometry(//size, //detail)
//for material use MeshBasicMaterial and change the color property
//two types of material
//1. Basic material - with lights
//2. Standard lights - without lights(you have to make the light to make it visible)

const geo = new THREE.IcosahedronGeometry(1.0, 2)
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
});


//create the mesh
const mesh = new THREE.Mesh(geo, mat);
//add to the scene
scene.add(mesh)


//                        create light

const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500)
scene.add(hemiLight)


//*********************geometry done*********************




//*********************making the wire mesh*********************

const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.0001)
//scene.add(wireMesh)
//if you rotate the geometry then the wire Mesh will not rotate with it 
//because it is not attach to the geometry mesh
//add the wireMesh to geo mesh
mesh.add(wireMesh)

//*********************wire mesh done*********************





//*********************making the orbit control*********************
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;
//*********************orbit control done*********************




//function to animate;
function animate(t = 0){
    requestAnimationFrame(animate)
    mesh.rotation.y = t*0.0001
    //now render the camera and scene in the body by renderer
    renderer.render(scene, camera);
    //update the control of every frame
    controls.update();

}
animate()
