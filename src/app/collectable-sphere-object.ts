import {Color, Material, MeshBasicMaterial, Object3D} from "three";
import {GameSphere} from "./geometry/game-cube";
import {AppComponent} from "./app.component";
import {GameAudioEvent} from "./GameAudioEvent";
import * as THREE from "three";

export class CollectableSphereObject extends GameSphere implements IClickableObject {

  private collectAudio: GameAudioEvent;

  constructor(x = 0, y = 0, z = 0) {
    super(.2, 5, 5, x, y, z);
    this.mesh.material = new MeshBasicMaterial({color: '#FFFF00' });
    this.mesh.userData = this;
    this.collectAudio = new GameAudioEvent('collect.wav');
  }

  onClick(): void {
    AppComponent.gameScore += 10;
    AppComponent.scene.remove(this.mesh);
    this.collectAudio.play(new THREE.Audio(AppComponent.globalAudioListener ));
  }
}

export interface IClickableObject {
  onClick() : void;
}
