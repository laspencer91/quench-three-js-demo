export class InputManager {

  public static singleton: InputManager;

  private forwardDown = false;

  private backwardDown = false;

  private strafeLeftDown = false;

  private strafeRightDown = false;

  private shootButton = false;

  constructor() {
    if (InputManager.singleton != null) {
      console.warn('OOPS SINGLETON INSTANCE ALREADY EXISTS');
      return;
    }
    InputManager.singleton = this;

    document.addEventListener('keydown', this.onDocumentKeyDown);
    document.addEventListener('keyup', this.onDocumentKeyUp);
    document.addEventListener( 'click', this.onDocumentMouseDown);
  }

  private onDocumentKeyDown(event: any) {
    const keyCode = event.keyCode;
    if (keyCode == 65) {
      InputManager.singleton.strafeLeftDown = true;
    } else if (keyCode == 68) {
      InputManager.singleton.strafeRightDown = true;
    } else if (keyCode == 87) {
      InputManager.singleton.forwardDown = true;
    } else if (keyCode == 83) {
      InputManager.singleton.backwardDown = true;
    }
  };

  private onDocumentKeyUp(event: any) {
    const keyCode = event.keyCode;
    if (keyCode == 65) {
      InputManager.singleton.strafeLeftDown = false;
    } else if (keyCode == 68) {
      InputManager.singleton.strafeRightDown = false;
    } else if (keyCode == 87) {
      InputManager.singleton.forwardDown = false;
    } else if (keyCode == 83) {
      InputManager.singleton.backwardDown = false;
    }
  };

  private onDocumentMouseDown() {
    InputManager.singleton.shootButton = true;
  }

  public getInput() {
    const input = new Input();
    input.walkInput += InputManager.singleton.forwardDown ? 1 : 0;
    input.walkInput -= InputManager.singleton.backwardDown ? 1 : 0;
    input.strafeInput += InputManager.singleton.strafeRightDown ? 1 : 0;
    input.strafeInput -= InputManager.singleton.strafeLeftDown ? 1 : 0;
    input.shootButtonPressed = InputManager.singleton.shootButton;

    // Make shoot button be semi automatic. gotta click again
    InputManager.singleton.shootButton = false;

    return input;
  }
}

export class Input {
  strafeInput: number = 0;
  walkInput: number = 0;
  shootButtonPressed = false;
}
