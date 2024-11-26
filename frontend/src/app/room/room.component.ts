import { Component, HostListener, OnInit } from '@angular/core';
import { Box } from './room.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

const length = 30;
const width = 30;
@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss',
})
export class RoomComponent implements OnInit {
  public canvas: Box[][] = [[]];
  public x = 0;
  public y = 0;
  public roomId: string = '';
  constructor(private activeRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.setRoomId();
    this.initialiseCanvas();
  }

  private setRoomId() {
    const snapShot = this.activeRoute.snapshot.queryParams;
    this.roomId = snapShot['roomId'] || '';
  }
  private initialiseCanvas() {
    this.canvas = Array.from({ length: length }, () =>
      Array.from({ length: width }, () => {
        return { userId: '', hasFurniture: false, color: '#FF0000' } as Box;
      })
    );
  }
  @HostListener('document:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    event.preventDefault();
    switch (event.key) {
      case 'ArrowUp':
        if (this.x > 0) this.x--;
        break;
      case 'ArrowDown':
        if (this.x < length-1) this.x++;
        break;
      case 'ArrowLeft':
        if (this.y > 0) this.y--;
        break;
      case 'ArrowRight':
        if (this.y < width-1) this.y++;
        break;
    }
  }
}
