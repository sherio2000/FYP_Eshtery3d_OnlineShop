import { ElementRef, Injectable, NgZone } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import * as $ from 'jquery';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private light: THREE.AmbientLight;

  private cube: THREE.Mesh;

  private frameId: number = null;

  constructor(private ngZone: NgZone) { }

  private ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }
  public createScene(canvas: ElementRef<HTMLCanvasElement>, product3dUrl: string): void {
    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = canvas.nativeElement;
    const manager = new THREE.LoadingManager();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    let container = document.getElementById('modal-body');
    this.renderer.setSize($(container).width(), $(container).height());
    container.appendChild(this.renderer.domElement);

    // create the scene
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    this.camera.position.z = 10;
    this.camera.position.y = -2;
    this.camera.position.x = 3;
    this.scene.add(this.camera);

    const controls = new OrbitControls(this.camera, this.canvas);
    controls.target.set(0, 0, 0);
    controls.update();

    // soft white light
    this.light = new THREE.AmbientLight(0x404040);
    this.light.position.z = 10;
    this.scene.add(this.light);

    let loader = new GLTFLoader(manager);
    const url = product3dUrl;
    loader.load(url, (gltf) => {
      const root = gltf.scene;
      root.rotation.x += 0.01;
      root.rotation.y += 0.01;
      this.fitCameraToObject(this.camera, root, 5);
      this.scene.add(root);
    });


  }

  public animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }
      window.addEventListener('resize', () => {
        this.resize();
      });
    });
  }

  public fitCameraToObject( camera, object, offset ) {

    offset = offset || 1.5;

    const boundingBox = new THREE.Box3();

    boundingBox.setFromObject( object );

    const center = boundingBox.getCenter( new THREE.Vector3() );
    const size = boundingBox.getSize( new THREE.Vector3() );

    const startDistance = center.distanceTo(camera.position);
    // here we must check if the screen is horizontal or vertical, because camera.fov is
    // based on the vertical direction.
    const endDistance = this.camera.aspect > 1 ?
              ((size.y / 2) + offset) / Math.abs(Math.tan(camera.fov / 2)) :
              ((size.y / 2) + offset) / Math.abs(Math.tan(camera.fov / 2)) / this.camera.aspect ;


    this.camera.position.set(
      this.camera.position.x * endDistance / startDistance,
      this.camera.position.y * endDistance / startDistance,
      this.camera.position.z * endDistance / startDistance,
    );
    this.camera.lookAt(center);
  }

  public render(): void {
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });

    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }

  public resize(): void {
    this.canvas = this.renderer.domElement;
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;

    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.renderer.setSize(width, height, false);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();

    }
  }
}
