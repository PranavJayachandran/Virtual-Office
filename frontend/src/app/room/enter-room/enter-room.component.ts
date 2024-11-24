import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { generateUniqueId } from './enter-room.helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enter-room',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './enter-room.component.html',
  styleUrl: './enter-room.component.scss',
})
export class EnterRoomComponent {
  public roomId: string = '';


  constructor(private router: Router){}

  public joinRoom() {
    // Do some validation for this
    console.log(this.roomId);
    this.roomId = '';
    this.enterRoom(this.roomId);
  }
  public createRoom() {
    const newRoomId = generateUniqueId();
    console.log(newRoomId);
    this.enterRoom(newRoomId);
  }
  private enterRoom(roomId: string) {
    this.router.navigate(['/room'],{
      queryParams: {
        roomId: roomId
      }
    })
  }
}
