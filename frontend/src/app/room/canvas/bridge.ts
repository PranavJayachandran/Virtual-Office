import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PhaserEventBus, PhaserEvents } from './phaserEventBus';
import { Room } from '../../shared/common.interface';
import { IOtherUserMovement, IUserMovement } from '../room.interface';

export enum BridgeEvents {
  RoomData,
  SceneReady,
  UserMovement,
  OtherUserMovement,
  UserInNeighbourHood
}
interface BridgeEventTypes {
  [BridgeEvents.RoomData]: { roomData: Room; userId: string };
  [BridgeEvents.SceneReady]: void;
  [BridgeEvents.UserMovement]: IUserMovement;
  [BridgeEvents.OtherUserMovement]: IOtherUserMovement;
  [BridgeEvents.UserInNeighbourHood]: {userId: string}
}
@Injectable({
  providedIn: 'root',
})
export class BridgeService {
  private event: any = {};

  constructor() {
    PhaserEventBus.on(PhaserEvents.RoomReady, (scene: any) => {
      this.event[BridgeEvents.SceneReady]?.next();
    });

    PhaserEventBus.on(PhaserEvents.UserMovement, (data: IUserMovement) => {
      this.event[BridgeEvents.UserMovement]?.next(data);
    });
    PhaserEventBus.on(PhaserEvents.UserInNeighBourHood, (data:{userId: string}) => {
      this.event[BridgeEvents.UserInNeighbourHood]?.next(data);
    })
  }

  broadcast<K extends keyof BridgeEventTypes>(
    key: K,
    data: BridgeEventTypes[K],
    phaserEvent: PhaserEvents
  ) {
    PhaserEventBus.emit(phaserEvent, data);
  }
  on<K extends keyof BridgeEventTypes>(
    key: K
  ): Observable<BridgeEventTypes[K]> {
    if (!this.event[key]) this.event[key] = new Subject<BridgeEventTypes[K]>();
    return this.event[key]!.asObservable();
  }
}
