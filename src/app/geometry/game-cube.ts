import {BoxGeometry, Mesh, MeshBasicMaterial, SphereGeometry, Texture, TextureLoader, Vector3} from "three";

export abstract class GameMesh {
  public mesh!: Mesh;

  constructor() {
  }

  public setPosition(x: number, y: number, z: number) {
    this.mesh.position.set(x, y, z);
  }
}

export class GameCube extends GameMesh {

  public mesh: Mesh;

  private geometry: BoxGeometry;

  constructor(width: number, height: number, depth: number, texImagePath = './../assets/16x16.png', x = 0, y = 0, z = 0) {
    super();
    this.geometry = new BoxGeometry(width, height, depth);
    if (texImagePath.length > 0) {
      const tex = new TextureLoader().load(texImagePath);
      const material = new MeshBasicMaterial({map: tex });
      this.mesh = new Mesh(this.geometry, material);
    } else {
      this.mesh = new Mesh(this.geometry);
    }
    this.setPosition(x, y, z);
  }
}

export class GameSphere extends GameMesh {

  public mesh: Mesh;

  private geometry: SphereGeometry;

  constructor(radius: number, widthSegments: number, heighSegments: number, x = 0, y = 0, z = 0) {
    super();
    this.geometry = new SphereGeometry(radius, widthSegments, heighSegments);
    this.mesh = new Mesh(this.geometry);
    this.setPosition(x, y, z);
  }
}
