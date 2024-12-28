import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideocallStartButtonComponent } from "./videocall-start-button/videocall-start-button.component";
import { BridgeEvents, BridgeService } from '../room/canvas/bridge';
import { slideInOut } from '../shared/animations/slideinout';
import { VideoCallService } from './videocall.service';
import { VideocallRequestToasterComponent } from "./videocall-request-toaster/videocall-request-toaster.component";

@Component({
  selector: 'app-videocall',
  standalone: true,
  imports: [CommonModule, VideocallStartButtonComponent, VideocallRequestToasterComponent],
  animations: [slideInOut],
  templateUrl: './videocall.component.html',
  styleUrl: './videocall.component.scss',
  providers: [VideoCallService]
})
export class VideocallComponent implements OnInit {
  @ViewChild('videocallrequestcontainer',{ read: ViewContainerRef, static: true }) container!: ViewContainerRef;
  public neighbourUserId: string = "1234";
  public videoCallRequest: string[]  = [];
  constructor(private bridgeEventBus: BridgeService, private videoCallService: VideoCallService) { }

  ngOnInit(): void {
    this.videoCallService.setViewContainerRef(this.container);
    this.bridgeEventBus.on(BridgeEvents.UserInNeighbourHood).subscribe((data: { userId: string }) => {
      this.neighbourUserId = data.userId;
    })

  }
}
