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

  player.setVelocity(xOffset, yOffset);

  scene.time.addEvent({
    delay: timePerStep, // Match duration to the intended distance
    callback: () => {
      player.setVelocity(0);
      player.setData(IS_MOVING, false);
    },
  });
};

export const placeObject = (
  platforms: Phaser.Physics.Arcade.StaticGroup,
  x: number,
  y: number,
  numberOfRows: number,
  numberOfCols: number,
  assetName: string
): Phaser.Physics.Arcade.Sprite => {
  const item = platforms.create(
    x * boxHeight + boxHeight / 2,
    y * boxWidth + boxWidth / 2,
    assetName
  );
  item.setDisplaySize(boxHeight * numberOfRows, boxWidth * numberOfCols).refreshBody();
  return item;
};
