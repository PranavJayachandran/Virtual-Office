import { Component, OnInit } from '@angular/core';
import { Box } from './room.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from './room.service';
import { GlobalDataService, GlobalMapKeys } from '../core/global.data.service';
import { Room } from '../shared/common.interface';
import { PhaserGame } from './canvas/canvas.component';
import { BridgeEvents, BridgeService } from './canvas/bridge';
import { PhaserEventBus, PhaserEvents } from './canvas/phaserEventBus';
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
    private globalService: GlobalDataService,
    private bridge: BridgeService
  ) {}
  ngOnInit(): void {
    this.userId = this.globalService.getData(GlobalMapKeys.UserId) ?? '';
    this.setRoomId();
    this.roomService.connect(this.roomId);
    this.bridge.on(BridgeEvents.SceneReady).subscribe(() => {
      this.roomService.getRoomData(this.roomId).subscribe((roomData: Room) => {
        console.log("USER",this.userId);
        this.bridge.broadcast(BridgeEvents.RoomData, {roomData, userId: this.userId}, PhaserEvents.RoomData);
      });
    });
    // this.initialiseCanvas();
    this.roomService.socket$.subscribe(
      (data: {
        posx: number;
        posy: number;
        userId: string;
        oldx: number;
        oldy: number;
      }) => {
        this.canvas[data.posx][data.posy].userId = data.userId;
        if (data.userId != this.userId)
          this.canvas[data.posx][data.posy].color = 'black';
        else this.canvas[data.posx][data.posy].color = 'red';
        this.resetBox(data.oldx, data.oldy);
      }
    );
  }

  private resetBox(x: number, y: number) {
    this.canvas[x][y].color = 'white';
    this.canvas[x][y].userId = '';
  }

  private setRoomId() {
    const snapShot = this.activeRoute.snapshot.queryParams;
    this.roomId = snapShot['roomId'] || '';
  }
  private initialiseCanvas() {
    this.canvas = Array.from({ length: length }, () =>
      Array.from({ length: width }, () => {
        return { userId: '', hasFurniture: false, color: 'white' } as Box;
      })
    );
    this.roomService.getRoomData(this.roomId).subscribe((roomData) => {
      if (roomData.memberIds)
        roomData.memberIds.forEach((element) => {
          this.canvas[element.x][element.y].userId = element.userId;
          this.canvas[element.x][element.y].color = 'black';
          if (element.userId == this.userId) {
            this.x = element.x;
            this.y = element.y;
          }
        });
      this.canvas[this.x][this.y].color = 'red';
    });
  }
}
