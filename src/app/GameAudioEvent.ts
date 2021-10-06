import * as THREE from "three";
import {AudioLoader} from "three";

export class GameAudioEvent {

  private static loader: AudioLoader;

  private buffer!: AudioBuffer;

  public loop = false;

  public volume = 0.5;

  private cachedAudioSource!: THREE.Audio;

  constructor(audioFileName: string, loop = false, volume = 0.5) {
    if (!GameAudioEvent.loader) {
      GameAudioEvent.loader = new AudioLoader();
    }
    this.loop = loop;
    this.volume = volume;
    GameAudioEvent.loader.load( './../assets/audio/' + audioFileName, (buffer) => this.onLoad(buffer));
  }

  private onLoad(buffer: AudioBuffer) {
      this.buffer = buffer;

      if (this.cachedAudioSource) {
        this.cachedAudioSource.setBuffer(this.buffer);
        this.cachedAudioSource.setLoop(this.loop);
        this.cachedAudioSource.setVolume(this.volume);
        this.cachedAudioSource.play();
      }
  }

  public play(audioSource: THREE.Audio) {
    if (this.buffer == null) {
      this.cachedAudioSource = audioSource;
      console.log('CACHING AUDIO SOURCE')
      return;
    }
    audioSource.setBuffer(this.buffer);
    audioSource.setLoop(this.loop);
    audioSource.setVolume(this.volume);
    audioSource.play();
  }
}
