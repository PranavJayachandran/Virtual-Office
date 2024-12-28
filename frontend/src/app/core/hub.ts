import { Injectable } from "@angular/core";
import { environment } from "../environment/environment";
import * as signalR from '@microsoft/signalr';
import { IUserMovement } from "../room/room.interface";
import { EventBusService } from "./eventbus";
import { Subject } from "rxjs";
import { User } from "../shared/common.interface";

export enum HubOutgoingEventEnums {
    JoinRoom = "JoinRoom",
    SendMessageToRoom = "SendMessageToRoom",
    SendVideoCallRequest = "SendVideoCallRequest"
}

export enum HubIncomingEventEnums {
    UserMovement = "UserMovement",
    VideoCallRequest = "VideoCallRequest"
}

interface HubIncomingEventTypes {
    [HubIncomingEventEnums.UserMovement]: IUserMovement,
    [HubIncomingEventEnums.VideoCallRequest]: string
}

@Injectable({
    providedIn: "root"
})
export class HubService {
    private hubConnection!: signalR.HubConnection;
    private event: any = {};
    private isConnected = false;
    constructor(private eventBus: EventBusService) {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(environment.socketUrl + "/roomHub")
            .build();
        this.startHub()
    }

    private startHub() {
        this.hubConnection.start().then(() => {
            this.listenAsync();
            this.isConnected = true;
        });
    }

    public async invokeAsync(key: HubOutgoingEventEnums, ...data: any[]) {
        if(!this.isConnected){
            await new Promise(res => setTimeout(res,3000));
        }
        if (data.length == 3) {
            this.hubConnection.invoke(key, data[0], data[1], data[2]);
        }
        else if (data.length == 2) {
            this.hubConnection.invoke(key, data[0], data[1]);
        }
        else
            this.hubConnection.invoke(key, data);
    }

    private listenAsync() {
        const enumKeys = Object.values(HubIncomingEventEnums) as (keyof HubIncomingEventTypes)[];
        for (let val of enumKeys) {
            this.hubConnection.on(val, (...data: any[]) => {
                if (!this.event[val]) {
                    this.event[val] = new Subject<HubIncomingEventTypes[typeof val]>();
                }
                this.event[val].next(data);
            })
        }
    }
    public on<K extends keyof HubIncomingEventTypes>(key: K) {
        if (!this.event[key]) {
            this.event[key] = new Subject<HubIncomingEventTypes[K]>();
        }
        return this.event[key].asObservable();
    }
}