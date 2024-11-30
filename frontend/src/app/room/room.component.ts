import { Component, HostListener, OnInit } from '@angular/core';
import { Box } from './room.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from './room.service';
import { GlobalDataService, GlobalMapKeys } from '../core/global.data.service';
import { Room } from '../shared/common.interface';
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
  public roomData!: Room;
  private userId: string = '';
  constructor(
    private activeRoute: ActivatedRoute,
    private roomService: RoomService,
    private globalService: GlobalDataService
  ) {}
  ngOnInit(): void {
    this.userId = this.globalService.getData(GlobalMapKeys.UserId) ?? '';
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
  @HostListener('document:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    event.preventDefault();
    const tx = this.x,
      ty = this.y;

    switch (event.key) {
      case 'ArrowUp':
        if (this.canMove(this.x - 1, this.y)) {
          this.x--;
          this.roomService.sendMessage(tx, ty, this.x, this.y);
        }

        break;
      case 'ArrowDown':
        if (this.canMove(this.x + 1, this.y)) {
          this.x++;
          this.roomService.sendMessage(tx, ty, this.x, this.y);
        }
        break;
      case 'ArrowLeft':
        if (this.canMove(this.x, this.y - 1)) {
          this.y--;
          this.roomService.sendMessage(tx, ty, this.x, this.y);
        }
        break;
      case 'ArrowRight':
        if (this.canMove(this.x, this.y + 1)) {
          this.y++;
          this.roomService.sendMessage(tx, ty, this.x, this.y);
        }
        break;
    }
  }
  private canMove(x: number, y: number) {
    if (
      x < 0 ||
      x >= length ||
      y < 0 ||
      y >= width ||
      this.canvas[x][y].userId != ''
    ) {
      return false;
    }
    return true;
  }
}
