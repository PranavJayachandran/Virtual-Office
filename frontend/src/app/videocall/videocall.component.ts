import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideocallStartButtonComponent } from "./videocall-start-button/videocall-start-button.component";
import { BridgeEvents, BridgeService } from '../room/canvas/bridge';
import { slideInOut } from '../shared/animations/slideinout';
import { VideoCallService } from './videocall.service';
import { VideocallRequestToasterComponent } from "./videocall-request-toaster/videocall-request-toaster.component";
import { EventBusEvents, EventBusService } from '../core/eventbus';

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
  private localStream!: MediaStream;
  private peerConnection!: RTCPeerConnection;
  private config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
  @ViewChild('videocallrequestcontainer', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;
  @ViewChild('localVideo') local!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remote!: ElementRef<HTMLVideoElement>;
  public neighbourUserId: string = "";

  constructor(private bridgeEventBus: BridgeService, private videoCallService: VideoCallService, private eventBus: EventBusService) { }

  async ngOnInit(): Promise<void> {
    await this.setupSignalR();
    this.startLocalStream();
    this.videoCallService.setViewContainerRef(this.container);
    this.bridgeEventBus.on(BridgeEvents.UserInNeighbourHood).subscribe((data: { userId: string }) => {
      this.neighbourUserId = data.userId.toString();
    });
    this.eventBus.on(EventBusEvents.ConnectionId).subscribe((str: string)=>{
      this.startCall(str);
    })
  }
  
  async startLocalStream(): Promise<void> {
    this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    const localVideo = this.local.nativeElement;
    localVideo.srcObject = this.localStream;
  }

  async setupSignalR(): Promise<void> {
    await this.videoCallService.startConnection();

    this.videoCallService.onSignalReceived(async (connectionId, signal) => {
      if (signal.type === 'offer') {
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(signal));
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);
        debugger;
        this.videoCallService.sendSignal(connectionId, answer);
      } else if (signal.type === 'answer') {
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(signal));
      } else if (signal.candidate) {
        await this.peerConnection.addIceCandidate(new RTCIceCandidate(signal.candidate));
      }
    });
  }

  startCall(remoteConnectionId: string): void {
    this.peerConnection = new RTCPeerConnection(this.config);
    // Add local stream tracks
    this.localStream.getTracks().forEach(track => {
      this.peerConnection.addTrack(track, this.localStream);
    });

    this.peerConnection.onicecandidate = event => {
      if (event.candidate) {
        this.videoCallService.sendSignal(remoteConnectionId, { candidate: event.candidate });
      }
    };

    this.peerConnection.ontrack = event => {
      this.remote.nativeElement.srcObject = event.streams[0];
      console.log(event.streams[0]);
    };

    this.peerConnection.createOffer().then(offer => {
      this.peerConnection.setLocalDescription(offer);
      this.videoCallService.sendSignal(remoteConnectionId, offer);
    });
  }

  // Optionally add cleanup for the local stream when the call ends
  stopCall(): void {
    this.localStream.getTracks().forEach(track => track.stop());
    if (this.peerConnection) {
      this.peerConnection.close();
    }
  }
}
