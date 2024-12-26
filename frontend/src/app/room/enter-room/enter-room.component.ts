import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EnterRoomService } from './enter-room.service';
import {
  GlobalDataService,
  GlobalMapKeys,
} from '../../core/global.data.service';
import { Room } from '../../shared/common.interface';

@Component({
  selector: 'app-enter-room',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './enter-room.component.html',
  styleUrl: './enter-room.component.scss',
  providers: [EnterRoomService],
})
export class EnterRoomComponent {
  public roomId: string = '';
  public errorMessage: string = '';

  constructor(
    private router: Router,
    private enterRoomService: EnterRoomService,
  ) {}

  public joinRoom() {
    // Do some validation for this
    this.enterRoomService.joinRoom(this.roomId).subscribe((data) => {
      this.enterRoom(data.roomId);
    });
  }
  public createRoom() {
    this.enterRoomService.createRoom(0, 0).subscribe((data) => {
      this.enterRoom(data.roomId);
    });
  }
  private enterRoom(roomId: string) {
    this.router.navigate(['/room'], {
      queryParams: {
        roomId: roomId,
      },
    });
  }
}
