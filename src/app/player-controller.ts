import {MathUtils, PerspectiveCamera, Raycaster, Vector2, Vector3} from "three";
import {InputManager} from "./input-manager";
import {PointerLockControls} from "three/examples/jsm/controls/PointerLockControls";
import {AppComponent} from "./app.component";
import {CollectableSphereObject, IClickableObject} from "./collectable-sphere-object";

/**
 * Author: Quench
 * Basic player controller for fps movement
 */
export class PlayerController {

  public maxSpeed = 1;

  public acceleration = 5;

  public friction = 5;

  private currentSpeed = 0;

  private camera: PerspectiveCamera;

  private pointerLockControls!: PointerLockControls;

  constructor(camera: PerspectiveCamera, canvas: HTMLCanvasElement, maxSpeed: number, acceleration: number, friction: number) {
    this.camera = camera;
    this.maxSpeed = maxSpeed;
    this.acceleration = acceleration;
    this.friction = friction;

    this.pointerLockControls = new PointerLockControls(this.camera, canvas);

    document.addEventListener( 'click', () => this.pointerLockControls.lock());
  }

  public setPosition(x = 0, y = 0, z = 0) {
    this.pointerLockControls.getObject().position.set(x, y, z);
  }

  public update(deltaTime: number) {
    const input = InputManager.singleton.getInput();

    // If shooting, check for clickable object
    if (input.shootButtonPressed) {
      const caster = new Raycaster();
      caster.setFromCamera(new Vector2(0, 0), this.camera);
      const intersects = caster.intersectObjects(AppComponent.scene.children);
      for (let i = 0; i < intersects.length; i++) {
        const intersectedObj = intersects[i].object.userData;
        if (intersectedObj && intersectedObj.onClick) {
          (intersectedObj as IClickableObject).onClick();
        }
      }
    }

    if (input.walkInput != 0) {
      this.currentSpeed += input.walkInput * this.acceleration * deltaTime;
      MathUtils.clamp(this.currentSpeed, -this.maxSpeed, this.maxSpeed);
    } else {
      this.currentSpeed = MathUtils.lerp(this.currentSpeed, 0, this.friction * deltaTime);
    }
    this.pointerLockControls.moveForward(this.currentSpeed * deltaTime);
  }
}
