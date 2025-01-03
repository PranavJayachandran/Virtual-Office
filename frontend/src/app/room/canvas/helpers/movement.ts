import {
  boxHeight,
  boxWidth,
  IS_MOVING,
  timePerStep,
} from '../constants/constants';
import { Direction } from '../enums/direction';
import { IPlayerCharacter } from '../interfaces/player.interface';
import { PhaserEventBus, PhaserEvents } from '../phaserEventBus';
import { Room } from '../scenes/room';

export const movePlayer = (
  scene: Room,
  player: Phaser.Physics.Arcade.Sprite,
  direction: Direction,
  isCurrentPlayer: boolean
) => {
  // Prevent multiple movements if already moving
  if (player.getData(IS_MOVING)) return;

  const velocity = boxHeight * (1000 / timePerStep); // Speed per second
  player.setData(IS_MOVING, true);

  // Play the movement animation
  player.anims.play(direction, true);

  // Set velocity based on direction
  const xVelocity =
    direction === Direction.Left
      ? -velocity
      : direction === Direction.Right
      ? velocity
      : 0;

  const yVelocity =
    direction === Direction.Up
      ? -velocity
      : direction === Direction.Down
      ? velocity
      : 0;


   // Apply velocity
  player.setVelocity(xVelocity, yVelocity);
  // Add a timed event to stop movement
  scene.time.addEvent({
    delay: timePerStep,
    callback: () => {
      // Stop velocity
      player.setVelocity(0);
      // Snap player to grid
      player.x = Math.round(player.x / boxWidth) * boxWidth;
      player.y = Math.round(player.y / boxHeight) * boxHeight;
      // Play static animation
      player.anims.play('static-' + direction);
      // Mark player as not moving
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
  return posx > oldx ? Direction.Right : Direction.Left;
};

export const moveCurrentPlayer = (player: Phaser.Physics.Arcade.Sprite, direction: Direction, playerList: IPlayerCharacter[]) => {
  const velocity = boxHeight * (1000 / timePerStep); // Speed per second
  const xVelocity =
    direction === Direction.Left
      ? -velocity
      : direction === Direction.Right
      ? velocity
      : 0;

  const yVelocity =
    direction === Direction.Up
      ? -velocity
      : direction === Direction.Down
      ? velocity
      : 0;
  

  for(let val of playerList){
    if(((player.x + (xVelocity * timePerStep/(1000))) / boxWidth == val.player.x/boxWidth) && ((player.y + (yVelocity * timePerStep/(1000))) / boxHeight == val.player.y/boxHeight))
      return;
  }

    
    PhaserEventBus.emit(PhaserEvents.UserMovement, {
      posX: Math.round(
        (player.x + (xVelocity * timePerStep/(1000))) / boxWidth
      ),
      posY: Math.round(
        (player.y + (yVelocity * (timePerStep)/1000)) / boxHeight
      ),
    });
}
