import { Component, HostListener, OnInit } from '@angular/core';
import { Box } from './room.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from './room.service';
import { GlobalDataService, GlobalMapKeys } from '../core/global.data.service';
const length = 30;
const width = 30;
@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss',
  providers: [RoomService],
})
export class RoomComponent implements OnInit {
  public canvas: Box[][] = [[]];
  public x = 0;
  public y = 0;
  public roomId: string = '123';
  constructor(
    private activeRoute: ActivatedRoute,
    private roomService: RoomService,
    private globalService: GlobalDataService
  ) {}
  ngOnInit(): void {
    this.setRoomId();
    this.roomService.connect(this.roomId);
    this.initialiseCanvas();
    this.roomService.socket$.subscribe(
      (data: {
        posx: number;
        posy: number;
        userId: string;
        oldx: number;
        oldy: number;
      }) => {
        console.log(data);
        this.canvas[data.posx][data.posy].userId = data.userId;
        this.canvas[data.posx][data.posy].color = 'red';
        this.canvas[data.oldx][data.oldy].color = 'white';
      }
    );
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

    const roomData = this.globalService.getData(GlobalMapKeys.Room) || {
      id: '1',
      ownerId: '2',
      memberIds: [
        {
          userId: '2',
          x: 0,
          y: 10,
          direction: 'U',
        },
        {
          userId: 'rw',
          x: 12,
          y: 5,
          direction: 'Y',
        },
      ],
    };
    console.log(roomData);
    if (roomData.memberIds)
      roomData.memberIds.forEach((element) => {
        this.canvas[element.x][element.y].userId = element.userId;
        this.canvas[element.x][element.y].color = 'black';
      });
    this.canvas[this.x][this.y].color = 'red';
  }
  @HostListener('document:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    event.preventDefault();
    const tx = this.x,
      ty = this.y;
    switch (event.key) {
      case 'ArrowUp':
        if (this.x > 0) {
          this.x--;
          this.roomService.sendMessage(tx, ty, this.x, this.y);
        }

        break;
      case 'ArrowDown':
        if (this.x < length - 1) {
          this.x++;
          this.roomService.sendMessage(tx, ty, this.x, this.y);
        }
        break;
      case 'ArrowLeft':
        if (this.y > 0) {
          this.y--;
          this.roomService.sendMessage(tx, ty, this.x, this.y);
        }
        break;
      case 'ArrowRight':
        if (this.y < width - 1) {
          this.y++;
          this.roomService.sendMessage(tx, ty, this.x, this.y);
        }
        break;
    }
  }
}
