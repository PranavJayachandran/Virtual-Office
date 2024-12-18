import {
  boxHeight,
  boxWidth,
  IS_MOVING,
  timePerStep,
} from '../constants/constants';
import { Direction } from '../enums/direction';
import { PhaserEventBus, PhaserEvents } from '../phaserEventBus';
import { Room } from '../scenes/room';

//currentPlayer is used because only for current player do we need to send the socket message
export const movePlayer = (
  scene: Room,
  player: Phaser.Physics.Arcade.Sprite,
  direction: Direction,
  isCurrentPlayer: boolean
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
  console.log(player.x, player.y,newX, newY, direction);
  if (isCurrentPlayer)
    PhaserEventBus.emit(PhaserEvents.UserMovement, {
      posx: Math.round(newX / boxWidth),
      posy: Math.round(newY / boxHeight),
    });
  if (newX < 0 || newX >= 1000 || newY < 0 || newY >= 1000) {
    player.setData(IS_MOVING, false);
    return;
  }
  player.setVelocity(xOffset, yOffset);

  scene.time.addEvent({
    delay: timePerStep,
    callback: () => {
      player.setVelocity(0);
      console.log("HERE");
      player.x = Math.round(player.x / boxWidth) * boxWidth;
      player.y = Math.round(player.y / boxHeight) * boxHeight;
      console.log(player.x, player.y, xOffset, yOffset);

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
  const item = platforms.create(x * boxWidth, y * boxHeight, assetName);
  item.setOrigin(0, 0);
  item.body.setOffset(0, 0);
  item
    .setDisplaySize(boxHeight * numberOfCols, boxWidth * numberOfRows)
    .refreshBody();
  return item;
};

export const directionResolver = (
  oldx: number,
  oldy: number,
  posx: number,
  posy: number
): Direction => {
  if (oldx == posx) {
    return posy > oldy ? Direction.Down : Direction.Up;
  }
  return posx > oldx  ? Direction.Right : Direction.Left;
};
