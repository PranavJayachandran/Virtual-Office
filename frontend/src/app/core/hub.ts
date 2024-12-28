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
}

export enum HubIncomingEventEnums {
    UserMovement = "UserMovement",
    VideoCallRequest = "VideoCallRequest"
}

interface HubIncomingEventTypes {
    [HubIncomingEventEnums.UserMovement]: IUserMovement,
    [HubIncomingEventEnums.VideoCallRequest]: User
}

@Injectable({
    providedIn: "root"
})
export class HubService {
    private hubConnection!: signalR.HubConnection;
    private event: any = {};

    constructor(private eventBus: EventBusService) {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(environment.socketUrl + "/roomHub")
            .build();
        this.startHub()
    }

    private startHub() {
        this.hubConnection.start().then(() => {
            this.listenAsync();
        });
    }

    public invokeAsync(key: HubOutgoingEventEnums, ...data: any[]) {
        this.hubConnection.invoke(key, data);
    }

    private listenAsync() {
        const enumKeys = Object.values(HubIncomingEventEnums) as (keyof HubIncomingEventTypes)[];
        for (let val of enumKeys) {
            this.hubConnection.on(val, (connectionId: string, data: HubIncomingEventTypes[typeof val]) => {
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