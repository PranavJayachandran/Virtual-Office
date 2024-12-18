import { Events } from 'phaser';

// Used to emit events between Vue components and Phaser scenes
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Events.EventEmitter
export const PhaserEventBus = new Events.EventEmitter();


export enum PhaserEvents{
    RoomReady = 'Room Ready',
    RoomData = 'Room Data',
    UserMovement = 'UserMovement',
    OtherUserMovement = 'OtherUserMovement'
}
