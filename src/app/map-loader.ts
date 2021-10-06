import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {Scene} from "three";
import {GameCube} from "./geometry/game-cube";
import {PlayerController} from "./player-controller";
import {CollectableSphereObject} from "./collectable-sphere-object";

export class SceneLoader {
  constructor(private scene: Scene, private playerController: PlayerController, private httpClient: HttpClient) {
  }

  public loadMap(filePath: string) {
    const subject = new Subject();
    const textLoadObservable = this.httpClient.get(filePath, { responseType: 'text' });
    textLoadObservable.subscribe(data => this.addSceneObjectsFromText(data));

    return subject;
  }

  private addSceneObjectsFromText(text: string) {
    var lines = text.split('\n');

    for (let yi = 0; yi <= lines.length; yi++) {
      let line = lines[yi];
      for (let xi = 0; xi <= line.length; xi++) {
        let char = line[xi];

        switch (char) {
          case '1': {
            const newCube = new GameCube(1, 1, 1);
            newCube.setPosition(xi, 0, yi);
            this.scene.add(newCube.mesh);
            break;
          }
          case '2': {
            const newCube = new GameCube(1, 2, 1);
            newCube.setPosition(xi, .5, yi);
            this.scene.add(newCube.mesh);
            break;
          }
          case 'P': {
            this.playerController.setPosition(xi, 0, yi);
            break;
          }
          case 'S': {
            const scoreObject = new CollectableSphereObject(xi, 0, yi);
            this.scene.add(scoreObject.mesh);
            break;
          }
        }

        this.scene.add()
      }
    }
  }
}
