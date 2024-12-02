import { Scene } from 'phaser';
import { EventBus } from '../eventBus';
import { userMovementAnimation } from '../helpers/animation';
import { boxHeight, boxWidth, IS_MOVING } from '../constants/constants';
import { movePlayer, placeObject } from '../helpers/movement';
import { Direction } from '../enums/direction';

export class Room extends Scene {
  camera!: Phaser.Cameras.Scene2D.Camera;
  gameText!: Phaser.GameObjects.Text;
  player!: Phaser.Physics.Arcade.Sprite;
  platforms!: Phaser.Physics.Arcade.StaticGroup;
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
    this.load.image('chair', 'assets/chair.png');
    this.load.image('table', 'assets/table.png');
  }
  public create() {
    this.platforms = this.physics.add.staticGroup();
    this.physics.world.enable(this.platforms);
    // const chair = placeObject(this.platforms, 10, 5, 1, 1, 'chair');

    this.camera = this.cameras.main;
    const table = placeObject(this.platforms, 10, 9, 4, 4, 'table');

    this.player = this.physics.add.sprite(
      10 * boxHeight + boxHeight / 2,
      5 * boxWidth + boxWidth / 2,
      'dude'
    );
    this.physics.world.enable(this.player);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, table, () => {
      console.log('Colide');
    });
    this.physics.add.overlap(this.player, this.platforms, () => {
      console.log('Player is overlapping with table!');
    });

    this.player.setData(IS_MOVING, false);
    userMovementAnimation(this, 'dude');

    this.grid();

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
        this.player.anims.play('turn');
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
}
