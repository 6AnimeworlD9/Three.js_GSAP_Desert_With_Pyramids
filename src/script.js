import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import {FontLoader} from "three/examples/jsm/loaders/FontLoader"
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry"
import gsap from 'gsap'


const gui = new dat.GUI()
const canvas = document.querySelector('canvas.webgl')

/** Scene + CubeMap */
const scene = new THREE.Scene()
scene.background = new THREE.CubeTextureLoader()
    .setPath( 'textures/cubeMaps/' )
    .load( [
        'px.png',
        'nx.png',
        'py.png',
        'ny.png',
        'pz.png',
        'nz.png'
    ] );
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')
bricksColorTexture.wrapS = THREE.RepeatWrapping
bricksColorTexture.wrapT = THREE.RepeatWrapping
bricksColorTexture.repeat.set(2,2)

const bricks1ColorTexture = textureLoader.load('/textures/bricks1/color.jpg')
const bricks1AmbientOcclusionTexture = textureLoader.load('/textures/bricks1/ambientOcclusion.jpg')
const bricks1NormalTexture = textureLoader.load('/textures/bricks1/normal.jpg')
const bricks1RoughnessTexture = textureLoader.load('/textures/bricks1/roughness.jpg')

const bricks2ColorTexture = textureLoader.load('/textures/bricks2/color.jpg')

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')
grassColorTexture.wrapS = THREE.RepeatWrapping
grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping
grassColorTexture.repeat.set(20,20)
grassAmbientOcclusionTexture.repeat.set(20,20)
grassNormalTexture.repeat.set(20,20)
grassRoughnessTexture.repeat.set(20,20)

/**
 * Pyramids
 */
const pyramids = new THREE.Group()
scene.add(pyramids)

const pyramid1 = new THREE.Mesh(new THREE.CylinderGeometry(0,2,2,4,1, true),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    }))
pyramid1.position.y = 0.95

const pyramid2 = new THREE.Mesh(new THREE.CylinderGeometry(0,3,3,4,1, true),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    }))
pyramid2.position.y = 1.5
pyramid2.position.x = 5
pyramid2.position.z = -5

const pyramid3 = new THREE.Mesh(new THREE.CylinderGeometry(0,5,5,4,1, true),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    }))
pyramid3.position.y = 2.5
pyramid3.position.x = -7
pyramid3.position.z = -7

pyramids.add(pyramid1)
pyramids.add(pyramid2)
pyramids.add(pyramid3)

/**
 * Doors for Pyramids
 */
const door1 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2),
    new THREE.MeshBasicMaterial( { color: 'black'} )
)
door1.position.x=0.87
door1.position.z=0.93
door1.position.y=0
door1.rotation.y=40
door1.rotation.z=15

const door2 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2),
    new THREE.MeshBasicMaterial( { color: 'black'} )
)
door2.position.x=-9.8
door2.position.z=-4.9
door2.position.y=0
door2.rotation.y=32
door2.rotation.z=20

const door3 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2),
    new THREE.MeshBasicMaterial( { color: 'black'} )
)
door3.position.x=3.65
door3.position.z=-3.5
door3.position.y=0.06
door3.rotation.y=32
door3.rotation.z=20

scene.add(door1)
scene.add(door2)
scene.add(door3)

/**
 * Egyptian CubeStone
 */
const cubeStone = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshStandardMaterial({
        map: bricks2ColorTexture,
    })
)
cubeStone.position.x=-3
cubeStone.position.z=6
cubeStone.position.y=0.1
cubeStone.rotation.x=-2
cubeStone.rotation.z=-1
scene.add(cubeStone)
/**
 * Egyptian Cylinder
 */
const cylinders = new THREE.Group()
scene.add(cylinders)
const cylinder1 = new THREE.Mesh(new THREE.CylinderGeometry( 0.1, 0.1, 1, 64 ),
    new THREE.MeshStandardMaterial({
        map: bricks1ColorTexture,
        aoMap: bricks1AmbientOcclusionTexture,
        normalMap: bricks1NormalTexture,
        roughnessMap: bricksRoughnessTexture
    }))
cylinder1.position.y = 0.5
cylinder1.position.x = 1.5
cylinder1.position.z = 1.5

const cylinder2 = new THREE.Mesh(new THREE.CylinderGeometry( 0.1, 0.1, 1, 64 ),
    new THREE.MeshStandardMaterial({
        map: bricks1ColorTexture,
        aoMap: bricks1AmbientOcclusionTexture,
        normalMap: bricks1NormalTexture,
        roughnessMap: bricksRoughnessTexture
    }))
cylinder2.position.y = 0.5
cylinder2.position.x = -1.5
cylinder2.position.z = 1.5

cylinders.add(cylinder1)
cylinders.add(cylinder2)

/**
 * 3D Text
 */
const fontLoader = new FontLoader()
fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new TextGeometry('Desert with Pyramids', {
        font: font,
        size: 0.5,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
    })
    const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
    const material = new THREE.MeshMatcapMaterial({matcap: matcapTexture})
    const text = new THREE.Mesh(textGeometry, material)
    text.position.y=3
    textGeometry.center()
    scene.add(text)
    /**
     * Gsap.timeline and Gsap.To
     */
    const gsapAnim=gsap.timeline({paused: true});
    gsapAnim.to(text.rotation, {repeat:100,duration : 100, delay: 1, y: 20})
    const f = new function () {
        this.pause = function() {
            gsapAnim.pause()
        }
        this.play = function() {
            gsapAnim.play()
        }
    }
    gui.add(f,'play').name('3d Text Animation Play')
    gui.add(f,'pause').name('3d Text Animation Pause')
})

/**
  Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100,10,10),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
    })
)
floor.rotation.x = -Math.PI * 0.5
floor.position.y = 0
floor.receiveShadow = true
scene.add(floor)
/**
 * Sphere's
 */
const geometry = new THREE.SphereGeometry( 0.1, 32, 16 )
const material = new THREE.MeshStandardMaterial({
    map: bricks1ColorTexture,
    aoMap: bricks1AmbientOcclusionTexture,
    normalMap: bricks1NormalTexture,
    roughnessMap: bricksRoughnessTexture
})
const sphere1 = new THREE.Mesh( geometry, material )
const sphere2 = new THREE.Mesh( geometry, material )
const sphere3 = new THREE.Mesh( geometry, material )
scene.add(sphere1)
scene.add(sphere2)
scene.add(sphere3)

/**
 * Lights, Shadows
 */
// First light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.8)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Second light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.8)
moonLight.position.set(4, 5, -2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001)
scene.add(moonLight)

moonLight.castShadow = true
moonLight.shadow.mapSize.width = 256
moonLight.shadow.mapSize.height = 256
moonLight.shadow.camera.far = 15
ambientLight.castShadow = true
sphere1.castShadow = true
sphere2.castShadow = true
sphere3.castShadow = true
pyramid1.castShadow = true
pyramid2.castShadow = true
pyramid3.castShadow = true
cylinder1.castShadow = true
cylinder2.castShadow = true
cubeStone.castShadow = true

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {

    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

/**
Fullscreen and Events
 */

window.addEventListener('dblclick', ()=>{

    const fullScreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (!fullScreenElement){

        if (canvas.requestFullscreen){
            canvas.requestFullscreen()
        } else if (canvas.webkitRequestFullscreen){
            canvas.webkitRequestFullscreen()
        }

    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen){
            document.webkitExitFullscreen()
        }
    }
})
window.addEventListener('fullscreenchange', ()=> {
    console.log('Задействован или отменен полноэкранный режим') //1 слушатель
})
window.addEventListener('online', ()=> {
    console.log('Доступ в интернет предоставлен') //2 слушатель
})
window.addEventListener('offline', ()=> {
    console.log('Доступ в интернет не предоставлен') //3 слушатель
})

/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    const sphere1Angle = elapsedTime * 0.5
    sphere1.position.x = Math.cos(sphere1Angle) * 4
    sphere1.position.z = Math.sin(sphere1Angle) * 4
    sphere1.position.y +=0.01

    const sphere2Angle = elapsedTime * 0.32
    sphere2.position.x = Math.cos(sphere2Angle) * 5
    sphere2.position.z = Math.sin(sphere2Angle) * 5
    sphere2.position.y +=0.01

    const sphere3Angle = elapsedTime * 0.18
    sphere3.position.x = Math.cos(sphere3Angle) * (7 + Math.sin(elapsedTime * 0.32));
    sphere3.position.z = Math.sin(sphere3Angle) * (7 + Math.sin(elapsedTime * 0.5));
    sphere3.position.y +=0.01

    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()