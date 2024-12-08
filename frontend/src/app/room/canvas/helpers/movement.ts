import {
  boxHeight,
  boxWidth,
  IS_MOVING,
  timePerStep,
} from '../constants/constants';
import { Direction } from '../enums/direction';
import { Room } from '../scenes/room';

export const movePlayer = (
  scene: Room,
  player: Phaser.Physics.Arcade.Sprite,
  direction: Direction
) => {
  if (player.getData(IS_MOVING)) return;

  player.anims.play(direction);
  const velocity = boxHeight * (1000 / timePerStep); // Adjust speed as needed

  player.setData(IS_MOVING, true);

  const xOffset =
    direction === Direction.Left
      ? -velocity
      : direction === Direction.Right
      ? velocity
      : 0;
  const yOffset =
    direction === Direction.Up
      ? -velocity
      : direction === Direction.Down
      ? velocity
      : 0;

  const newX = player.x + xOffset * (timePerStep / 1000);
  const newY = player.y + yOffset * (timePerStep / 1000);
  console.log(newX, newY);
  if (newX < 0 || newX >= 1000 || newY < 0 || newY >= 1000) {
    player.setData(IS_MOVING, false);
    return;
  }
  player.setVelocity(xOffset, yOffset);

  scene.time.addEvent({
    delay: timePerStep,
    callback: () => {
      player.setVelocity(0);

      player.x = Math.round(player.x / boxWidth) * boxWidth;
      player.y = Math.round(player.y / boxHeight) * boxHeight;

      player.anims.play('static-' + direction);
      player.setData(IS_MOVING, false);
    },
  });
};

export const placeObject = (
  platforms: Phaser.Physics.Arcade.StaticGroup | Phaser.Physics.Arcade.Group,
  x: number,
  y: number,
  numberOfRows: number,
  numberOfCols: number,
  assetName: string
): Phaser.Physics.Arcade.Sprite => {
  const item = platforms.create(x * boxHeight, y * boxWidth, assetName);
  item.setOrigin(0, 0);
  item.body.setOffset(0, 0);
  item
    .setDisplaySize(boxHeight * numberOfRows, boxWidth * numberOfCols)
    .refreshBody();
  return item;
};
