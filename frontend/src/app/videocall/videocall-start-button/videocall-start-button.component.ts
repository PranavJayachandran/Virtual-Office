import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  public enterVideoCall(){
    
  }

  public close(){
    this.neighbourUserId = "";
    this.neighbourUserIdChange.emit(this.neighbourUserId);
  }
}
