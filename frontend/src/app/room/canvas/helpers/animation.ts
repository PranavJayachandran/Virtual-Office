import { Direction } from '../enums/direction';
import { Room } from '../scenes/room';

export const userMovementAnimation = (scene: Room, avatar: string) => {
  scene.anims.create({
    key: Direction.Left,
    frames: scene.anims.generateFrameNumbers(avatar, { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: Direction.Up,
    frames: scene.anims.generateFrameNumbers(avatar, { start: 4, end: 4 }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: Direction.Down,
    frames: scene.anims.generateFrameNumbers(avatar, { start: 4, end: 4 }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: Direction.Right,
    frames: scene.anims.generateFrameNumbers(avatar, { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'static-' + Direction.Left,
    frames: [{ key: avatar, frame: 0 }],
    frameRate: 20,
  });
  scene.anims.create({
    key: 'static-' + Direction.Up,
    frames: [{ key: avatar, frame: 4 }],
    frameRate: 20,
  });
  scene.anims.create({
    key: 'static-' + Direction.Right,
    frames: [{ key: avatar, frame: 5 }],
    frameRate: 20,
  });
  scene.anims.create({
    key: 'static-' + Direction.Down,
    frames: [{ key: avatar, frame: 4 }],
    frameRate: 20,
  });
};
