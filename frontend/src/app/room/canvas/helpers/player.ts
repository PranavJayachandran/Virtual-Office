import { boxHeight, boxWidth } from '../constants/constants';
export const createPlayer = (
  x: number,
  y: number,
  spriteName: string,
  physics: Phaser.Physics.Arcade.ArcadePhysics,
  textObj: Phaser.GameObjects.Text,
  events: Phaser.Events.EventEmitter
) => {
  const player = physics.add.sprite(x * boxWidth, y * boxHeight, spriteName);

  player.setOrigin(0, 0);
  player.setOffset(0,0);
  player.setDisplaySize(boxWidth, boxHeight);
  physics.world.enable(player);
  player.body.setCollideWorldBounds(true);
  player.body.immovable = true; // Prevent being pushed

  textObj.setOrigin(0, 1);
  textObj.setPosition(player.x, player.y + boxHeight);

  events.on('update', () => {
    textObj.setPosition(player.x, player.y + boxHeight);
  });

  return player;
};
