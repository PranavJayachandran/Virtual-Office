import { Injectable } from "@angular/core";
import { User } from "../shared/common.interface";
import { Subject } from "rxjs";

export enum EventBusEvents {
  VideoCallInvite
}
interface EventBusTypes {
  [EventBusEvents.VideoCallInvite]: User;
}

@Injectable({
  providedIn: "root"
})
export class EventBusService{

  private event: any = {};

  broadcast<K extends keyof EventBusTypes> (key: K, data: EventBusTypes[K]){
    if(!this.event[key])
      this.event[key] = new Subject<EventBusTypes[K]>();
    this.event[key].next(data);
  }

  on<K extends keyof EventBusTypes>(key: K){
    if(!this.event[key])
      this.event[key] = new Subject<EventBusTypes[K]>();
    return this.event[key].asObservable();
  }

}
