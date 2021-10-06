import {Component, ElementRef, ViewChild} from '@angular/core';
import {Clock, Color, PerspectiveCamera, Renderer, Scene, WebGL1Renderer} from "three";
import {InputManager} from "./input-manager";
import {PlayerController} from "./player-controller";
import {HttpClient} from "@angular/common/http";
import {SceneLoader} from "./map-loader";
import TextSprite from '@seregpie/three.text-sprite';
import {GameCube} from "./geometry/game-cube";
import * as THREE from 'three';
import {GameAudioEvent} from "./GameAudioEvent";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('canvas') private canvasReference: ElementRef | undefined;

  private clock = new Clock();

  private camera!: PerspectiveCamera;

  public static scene: Scene;

  public static globalAudioListener: THREE.AudioListener;

  private renderer!: Renderer;

  private get canvas(): HTMLCanvasElement {
    return this.canvasReference?.nativeElement;
  }

  private playerController!: PlayerController;

  public static gameScore = 0;

  constructor(private httpClient: HttpClient) {

  }

  ngAfterViewInit(): void {
    // Initialize Singleton
    new InputManager();

    this.createScene();
    this.startRenderingLoop();
  }

  ngOnInit(): void {
  }

  private createScene() {
    AppComponent.scene = new Scene();
    AppComponent.scene.background = new Color(0x00000);

    // Camera Setup
    const fieldOfView = 60;
    const nearPlane = 0.1;
    const farPlane = 1000;
    const aspectRatio = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera = new PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    this.camera.position.z = 5;

    // Audio Setup
    AppComponent.globalAudioListener = new THREE.AudioListener();
    this.camera.add( AppComponent.globalAudioListener  );
    const sound = new THREE.Audio( AppComponent.globalAudioListener  );
    const bgMusicEvent = new GameAudioEvent('jaz_bg_music.mp3', true, 0.2);
    bgMusicEvent.play(sound);

    this.playerController = new PlayerController(this.camera, this.canvas, 10, 5, 5);
    // Read map file
    let sceneLoader = new SceneLoader(AppComponent.scene, this.playerController, this.httpClient);
    sceneLoader.loadMap('./../assets/map_1.txt');
  }

  private startRenderingLoop() {
    this.renderer = new WebGL1Renderer({canvas: this.canvas});
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: AppComponent = this;
    (function render() {
      requestAnimationFrame(render);
      const dt = component.clock.getDelta();
      component.playerController.update(dt);
      component.renderer.render(AppComponent.scene, component.camera);
    }());
  }

  getScoreText(): string {
    return AppComponent.gameScore.toString();
  }
}
