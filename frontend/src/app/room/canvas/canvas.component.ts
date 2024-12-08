import { Component, Input, OnInit } from '@angular/core';
import Phaser from 'phaser';
import StartGame from './canvas.main';
import { PhaserEventBus, PhaserEvents } from './phaserEventBus';

@Component({
  selector: 'phaser-game',
  template:
    '<div id="game-container" style="height: 1000px; width: 1000px;"></div>',
  standalone: true,
})
export class PhaserGame implements OnInit {
  scene!: Phaser.Scene;
  game!: Phaser.Game;

  sceneCallback!: (scene: Phaser.Scene) => void;

  ngOnInit() {
    this.game = StartGame('game-container');
    PhaserEventBus.on(PhaserEvents.RoomReady, (scene: Phaser.Scene) => {
      this.scene = scene;
      if (this.sceneCallback) {
        this.sceneCallback(scene);
      }
    });
  }

  // Component unmounted
  ngOnDestroy() {
    if (this.game) {
      this.game.destroy(true);
    }
  }
}
