import { Scene } from 'phaser';
import { PhaserEventBus, PhaserEvents } from '../phaserEventBus';
import { userMovementAnimation } from '../helpers/animation';
import { boxHeight, boxWidth, IS_MOVING } from '../constants/constants';
import {
  directionResolver,
  movePlayer,
  placeObject,
  moveCurrentPlayer
} from '../helpers/movement';
import { Direction } from '../enums/direction';
import { assets } from '../constants/assets';
import { createPlayer } from '../helpers/player';
import { GlobalMapKeys } from '../../../core/global.data.service';
import { IOtherUserMovement } from '../../room.interface';
import { IPlayerCharacter } from '../interfaces/player.interface';

export class Room extends Scene {
  camera!: Phaser.Cameras.Scene2D.Camera;
  gameText!: Phaser.GameObjects.Text;
  player!: Phaser.Physics.Arcade.Sprite;
  colliding!: Phaser.Physics.Arcade.StaticGroup;
  nonColliding!: Phaser.Physics.Arcade.Group;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  currentUser = '';
  players!: Phaser.Physics.Arcade.Group;
  playersList: IPlayerCharacter[] = [];
  constructor() {
    super('Room');
  }

  public preload() {
    // this.load.image('bg', 'assets/bg.jpeg');
    this.load.spritesheet('dude', 'assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.addAssets();

    PhaserEventBus.on(PhaserEvents.RoomData, (data: any) => {
      const roomData = data.roomData;
      console.log(roomData);
      this.currentUser = data.userId;
      roomData.userIds.forEach((element: any) => {
        const text = this.add.text(0, 0, element.userId);
        const player = createPlayer(
          element.posX,
          element.posY,
          'dude',
          this.physics,
          text,
          this.events
        );
        if (element.userId == this.currentUser) {
          this.player = player;
          this.player.setData(IS_MOVING, false);
        } else {
          // player.body.moves = false;
        }
        this.physics.add.collider(player, this.players);
        player.body.setCollideWorldBounds(true);
        this.players.add(player);
        this.playersList.push({ userId: element.userId, player });
      });

     // PhaserEventBus.on(
     //   PhaserEvents.OtherUserMovement,
     //   (data: IOtherUserMovement) => {
     //     if (data.userId == this.currentUser) return;
     //     const player = this.playersList.filter(
     //       (player: IPlayerCharacter) => data.userId === player.userId
     //     );
     //     if (player.length) {
     //       this.physics.moveTo(
     //         player[0].player,
     //         Math.round(player[0].player.x / boxWidth),
     //         Math.round(player[0].player.y / boxHeight),
     //         1000
     //       );
     //     }
     //   }
     // );

      PhaserEventBus.on(
        PhaserEvents.OtherUserMovement,
        (data: IOtherUserMovement) => {
          const player = this.playersList.find(
            (player: IPlayerCharacter) => data.userId === player.userId
          );
          if (player) {
        console.log("REcioed",data,player.player.x, player.player.y);
            movePlayer(
              this,
              player.player,
              directionResolver(
                Math.round(player.player.x / boxWidth),
                Math.round(player.player.y / boxHeight),
                data.posX,
                data.posY
              ),
              false
            );
          }
        }
      );
    });
  }
  public create() {
    this.colliding = this.physics.add.staticGroup();
    this.players = this.physics.add.group();
    this.nonColliding = this.physics.add.group();

    this.physics.world.enable(this.colliding);
    this.createGroupArea();
    this.camera = this.cameras.main;
    this.createPrivateArea();
    userMovementAnimation(this, 'dude');
    this.physics.add.collider(this.players, this.colliding);
    PhaserEventBus.emit(PhaserEvents.RoomReady, this);
  }
  public override update() {
    if (this.player && !this.player.getData(IS_MOVING)) {
      this.cursors = this.input.keyboard?.createCursorKeys()!;

      if (this.cursors.left.isDown) {
        moveCurrentPlayer(this.player, Direction.Left);
      } else if (this.cursors.right.isDown) {
        moveCurrentPlayer(this.player, Direction.Right);
      } else {
        this.player.setVelocityX(0);
      }

      if (this.cursors.up.isDown) {
        moveCurrentPlayer(this.player, Direction.Up);
      } else if (this.cursors.down.isDown) {
        moveCurrentPlayer(this.player, Direction.Down);
      } else {
        this.player.setVelocityY(0);
      }
    }
  }

  private addAssets() {
    assets.forEach((element) => {
      this.load.image(element.name, element.assets);
    });
  }

  private createPrivateArea() {
    placeObject(this.colliding, 10, 0, 1, 1, 'table-single');
    placeObject(this.colliding, 11, 0, 1, 1, 'table-single');
    placeObject(this.colliding, 12, 0, 1, 1, 'table-single');
    placeObject(this.colliding, 13, 0, 1, 1, 'table-single');
    placeObject(this.colliding, 14, 0, 1, 1, 'table-single');
    placeObject(this.colliding, 15, 0, 1, 1, 'table-single');
  }

  private createGroupArea() {
    const addCollidableRectangle = (
      x: number,
      y: number,
      width: number,
      height: number
    ) => {
      let rectangle = this.add.rectangle(x, y, width, height, 0x0000);

      rectangle.setOrigin(0, 0);
      this.colliding.add(rectangle);

      return rectangle;
    };

    addCollidableRectangle.call(
      this,
      boxHeight * 7,
      boxWidth * 6,
      boxHeight,
      9 * boxWidth
    );
    addCollidableRectangle.call(
      this,
      boxHeight * 8,
      boxWidth * 6,
      boxHeight * 2,
      boxWidth
    );
    addCollidableRectangle.call(
      this,
      boxHeight * 12,
      boxWidth * 6,
      boxHeight * 4,
      boxWidth
    );
    addCollidableRectangle.call(
      this,
      boxHeight * 16,
      boxWidth * 6,
      boxHeight,
      boxWidth * 9
    );
    addCollidableRectangle.call(
      this,
      boxHeight * 7,
      boxWidth * 15,
      boxHeight * 10,
      boxWidth
    );
    //Placing all the chairs
    placeObject(this.nonColliding, 10, 8, 1, 1, 'chair-up');
    placeObject(this.nonColliding, 11, 8, 1, 1, 'chair-up');
    placeObject(this.nonColliding, 12, 8, 1, 1, 'chair-up');
    placeObject(this.nonColliding, 13, 8, 1, 1, 'chair-up');

    placeObject(this.nonColliding, 9, 9, 1, 1, 'chair-left');
    placeObject(this.nonColliding, 9, 10, 1, 1, 'chair-left');
    placeObject(this.nonColliding, 9, 11, 1, 1, 'chair-left');
    placeObject(this.nonColliding, 9, 12, 1, 1, 'chair-left');

    placeObject(this.nonColliding, 10, 13, 1, 1, 'chair-down');
    placeObject(this.nonColliding, 11, 13, 1, 1, 'chair-down');
    placeObject(this.nonColliding, 12, 13, 1, 1, 'chair-down');
    placeObject(this.nonColliding, 13, 13, 1, 1, 'chair-down');

    placeObject(this.nonColliding, 14, 9, 1, 1, 'chair-right');
    placeObject(this.nonColliding, 14, 10, 1, 1, 'chair-right');
    placeObject(this.nonColliding, 14, 11, 1, 1, 'chair-right');
    placeObject(this.nonColliding, 14, 12, 1, 1, 'chair-right');
    const table = placeObject(this.colliding, 10, 9, 4, 4, 'table-group');
  }
}

//Todo:
// - Make multiple user coming in the scene and how to manage it.
// - Create a primitive for a group call when in a area
