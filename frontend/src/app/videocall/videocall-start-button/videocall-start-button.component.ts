import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VideoCallService } from '../videocall.service';

@Component({
  selector: 'app-videocall-start-button',
  standalone: true,
  imports: [],
  templateUrl: './videocall-start-button.component.html',
  styleUrl: './videocall-start-button.component.scss'
})
export class VideocallStartButtonComponent {
  @Input() neighbourUserId: string = "";
  @Output() neighbourUserIdChange = new EventEmitter<string>();

  constructor(private videoCallService: VideoCallService) { }
  public enterVideoCall() {
    this.videoCallService.acceptVideoCallRequest(this.neighbourUserId);
  }

  public close() {
    this.neighbourUserId = "";
    this.neighbourUserIdChange.emit(this.neighbourUserId);
  }
}
