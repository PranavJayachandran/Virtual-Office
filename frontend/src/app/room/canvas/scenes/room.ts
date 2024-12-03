import { Scene } from 'phaser';
import { EventBus } from '../eventBus';
import { userMovementAnimation } from '../helpers/animation';
import { boxHeight, boxWidth, IS_MOVING } from '../constants/constants';
import { movePlayer, placeObject } from '../helpers/movement';
import { Direction } from '../enums/direction';
import { assets } from '../constants/assets';

export class Room extends Scene {
  camera!: Phaser.Cameras.Scene2D.Camera;
  gameText!: Phaser.GameObjects.Text;
  player!: Phaser.Physics.Arcade.Sprite;
  colliding!: Phaser.Physics.Arcade.StaticGroup;
  nonColliding!: Phaser.Physics.Arcade.Group;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

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
  }
  public create() {
    this.colliding = this.physics.add.staticGroup();
    this.nonColliding = this.physics.add.group();

    this.physics.world.enable(this.colliding);
    this.createGroupArea();

    this.camera = this.cameras.main;
    this.createPrivateArea();
    this.player = this.physics.add.sprite(10 * boxHeight, 5 * boxWidth, 'dude');
    this.player.setOrigin(0, 0);
    this.player.setOffset(0, 0);
    this.player.setDisplaySize(boxHeight, boxWidth);
    this.physics.world.enable(this.player);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.colliding, () => {
      console.log('Colide');
    });
    this.player.setData(IS_MOVING, false);
    userMovementAnimation(this, 'dude');

    // this.grid();

    EventBus.emit('current-scene-ready', this);
  }
  public override update() {
    if (!this.player.getData(IS_MOVING)) {
      this.cursors = this.input.keyboard?.createCursorKeys()!;

      if (this.cursors.left.isDown) {
        movePlayer(this, this.player, Direction.Left);
      } else if (this.cursors.right.isDown) {
        movePlayer(this, this.player, Direction.Right);
      } else {
        this.player.setVelocityX(0);
      }

      if (this.cursors.up.isDown) {
        movePlayer(this, this.player, Direction.Up);
      } else if (this.cursors.down.isDown) {
        movePlayer(this, this.player, Direction.Down);
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

  private grid() {
    const cols = Math.ceil(this.scale.width / boxWidth); // Number of columns
    const rows = Math.ceil(this.scale.height / boxHeight); // Number of rows

    // Draw grid lines
    const graphics = this.add.graphics({
      lineStyle: { width: 1, color: 0x00ff00 },
    });

    // Draw vertical lines
    for (let i = 0; i <= cols; i++) {
      const x = i * boxWidth;
      graphics.lineBetween(x, 0, x, this.scale.height);
    }

    // Draw horizontal lines
    for (let j = 0; j <= rows; j++) {
      const y = j * boxHeight;
      graphics.lineBetween(0, y, this.scale.width, y);
    }
  }

  private createPrivateArea(){
    placeObject(this.colliding, 10, 0, 1, 1, 'table-single');
    placeObject(this.colliding, 11, 0, 1, 1, 'table-single');
    placeObject(this.colliding, 12, 0, 1, 1, 'table-single');
    placeObject(this.colliding, 13, 0, 1, 1, 'table-single');
    placeObject(this.colliding, 14, 0, 1, 1, 'table-single');
    placeObject(this.colliding, 15, 0, 1, 1, 'table-single');
  }

  private createGroupArea(){
    const addCollidableRectangle = (
      x: number,
      y: number,
      width: number,
      height: number
    ) => {
      let rectangle = this.add.rectangle(x, y, width, height, 0x0000);

      // Set the origin of the rectangle
      rectangle.setOrigin(0, 0);
      this.colliding.add(rectangle);

      return rectangle;
    };

    // Add the collidable rectangles
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
// - Create a primitive for a group call when in a area
// - Make multiple user coming in the scene and how to manage it.
