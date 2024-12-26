import { Component, OnInit } from '@angular/core';
import { Box, IOtherUserMovement, IUserMovement } from './room.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from './room.service';
import { GlobalDataService, GlobalMapKeys } from '../core/global.data.service';
import { Room } from '../shared/common.interface';
import { PhaserGame } from './canvas/canvas.component';
import { BridgeEvents, BridgeService } from './canvas/bridge';
import { PhaserEventBus, PhaserEvents } from './canvas/phaserEventBus';
import { UserService } from '../core/user.service';
const length = 30;
const width = 30;
@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule, PhaserGame],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss',
  providers: [RoomService],
})
export class RoomComponent implements OnInit {
  public canvas: Box[][] = [[]];
  public x = 0;
  public y = 0;
  public roomId: string = '123';
  public roomData!: Room;
  private userId: string = '';
  constructor(
    private activeRoute: ActivatedRoute,
    private roomService: RoomService,
    private bridge: BridgeService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.userId = this.userService.getUserId() ?? '';
    this.setRoomId();
    this.roomService.connect(this.roomId);
    this.bridge.on(BridgeEvents.SceneReady).subscribe(() => {
      this.roomService.getRoomData(this.roomId).subscribe((roomData: Room) => {
        this.bridge.broadcast(
          BridgeEvents.RoomData,
          { roomData, userId: this.userId },
          PhaserEvents.RoomData
        );
      });
    });
    this.bridge.on(BridgeEvents.UserMovement).subscribe((data: IUserMovement)=>{
      console.log("Sending data",data);
      this.roomService.sendMessage(data);
    })
    this.roomService.socket$.subscribe((data: IOtherUserMovement) => {
      if(data.userId != this.userId)
      this.bridge.broadcast(
        BridgeEvents.OtherUserMovement,
        data,
        PhaserEvents.OtherUserMovement
      );
    });
  }

  private setRoomId() {
    const snapShot = this.activeRoute.snapshot.queryParams;
    this.roomId = snapShot['roomId'] || '';
  }
}
