import { AUTO, Game } from 'phaser';
import { Room } from './scenes/room';

const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: '100%',
  height: '100%',
  parent: 'game-container',
  backgroundColor: '#808080',
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  scene: [Room],
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
