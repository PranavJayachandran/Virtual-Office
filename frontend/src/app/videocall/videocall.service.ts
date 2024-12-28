import { Injectable, ViewContainerRef } from "@angular/core";
import { VideocallRequestToasterComponent } from "./videocall-request-toaster/videocall-request-toaster.component";
import { HubIncomingEventEnums, HubOutgoingEventEnums, HubService } from "../core/hub";
import { UserService } from "../core/user.service";
import { GlobalDataService, GlobalMapKeys } from "../core/global.data.service";
import { environment } from "../environment/environment";
import * as signalR from "@microsoft/signalr";

@Injectable({
    providedIn:"root"
})
export class VideoCallService {
  private viewContainerRef!: ViewContainerRef;
  private hubConnection!: signalR.HubConnection;

  constructor(private hubService: HubService, private userService: UserService, private globalService: GlobalDataService) {
    this.listenVideoCallRequest();
  }

 async  startConnection(): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.socketUrl + '/videoCallHub') // Replace with your backend URL
      .build();

    this.hubConnection.start().catch(err => console.error("SignalR connection error:", err));
    await new Promise(res => setTimeout(res, 3000));
  }

  sendSignal(connectionId: string, signal: any): void {
    this.hubConnection.invoke('SendSignal', connectionId, signal)
      .catch(err => console.error("Signal sending error:", err));
  }

  onSignalReceived(callback: (connectionId: string, signal: any) => void): void {
    this.hubConnection.on('ReceiveSignal', callback);
  }

  public setViewContainerRef(vcr: ViewContainerRef) {
    this.viewContainerRef = vcr;
  }

  private listenVideoCallRequest() {
    this.hubService.on(HubIncomingEventEnums.VideoCallRequest).subscribe((data: any) => {
      if (this.viewContainerRef) {
        const componentRef = this.viewContainerRef.createComponent(VideocallRequestToasterComponent);
        componentRef.changeDetectorRef.detectChanges();
        componentRef.instance.userId = data[0];
        componentRef.instance.connectionId = data[1];


        if ('destroySelf' in componentRef.instance) {
          (componentRef.instance as any).destroySelf = () => {
            componentRef.destroy();
          };
        }
      }
    });
  }

  public acceptVideoCallRequest(neighbourUserId: string) {
    const roomId = this.globalService.getData(GlobalMapKeys.RoomId);
    const userId = this.userService.getUserId();
    this.hubService.invokeAsync(HubOutgoingEventEnums.SendVideoCallRequest, roomId, neighbourUserId, userId);
  }
}
