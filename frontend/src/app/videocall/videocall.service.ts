import { Injectable, ViewContainerRef } from "@angular/core";
import { VideocallRequestToasterComponent } from "./videocall-request-toaster/videocall-request-toaster.component";
import { HubIncomingEventEnums, HubService } from "../core/hub";
import { User } from "../shared/common.interface";

@Injectable()
export class VideoCallService {
    private viewConrtainerRef!: ViewContainerRef
    constructor(private hubService: HubService) {
            this.listenVideoCallRequest();
    }
    public setViewContainerRef(vcr: ViewContainerRef) {
        this.viewConrtainerRef = vcr;
    }
    private listenVideoCallRequest() {
        this.hubService.on(HubIncomingEventEnums.VideoCallRequest).subscribe((user: User)=>{
            if (this.viewConrtainerRef) {
                const componentRef = this.viewConrtainerRef.createComponent(VideocallRequestToasterComponent);
                componentRef.changeDetectorRef.detectChanges();
                componentRef.instance.user = user;
    
                if ('destroySelf' in componentRef.instance) {
                    (componentRef.instance as any).destroySelf = () => {
                        componentRef.destroy();
                    }
                }
            }
        })
    }
}