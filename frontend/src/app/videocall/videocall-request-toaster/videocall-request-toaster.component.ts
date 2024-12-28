import { Component, Input, OnInit } from '@angular/core';
import { slideInOut } from '../../shared/animations/slideinout';
import { User } from '../../shared/common.interface';
import { HubOutgoingEventEnums, HubService } from '../../core/hub';
import { VideoCallService } from '../videocall.service';
import { EventBusEvents, EventBusService } from '../../core/eventbus';

@Component({
  selector: 'app-videocall-request-toaster',
  standalone: true,
  imports: [],
  templateUrl: './videocall-request-toaster.component.html',
  styleUrl: './videocall-request-toaster.component.scss',
  animations: [slideInOut]
})
export class VideocallRequestToasterComponent implements OnInit {
  @Input() userId: string = "";
  @Input() connectionId: string = "";
  destroySelf!: () => void;

  constructor(private eventBus: EventBusService){}

  ngOnInit(): void {
    setTimeout(() => {
      this.destroySelf();
    }, 4000);
  }
  close() {
    this.destroySelf();
  }
  acceptVideoCallRequest() {
    this.eventBus.broadcast(EventBusEvents.ConnectionId, this.connectionId);
  }
}
