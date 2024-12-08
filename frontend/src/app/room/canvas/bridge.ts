import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PhaserEventBus, PhaserEvents } from './phaserEventBus';
import { Room } from '../../shared/common.interface';

export enum BridgeEvents {
  RoomData,
  SceneReady,
}
interface BridgeEventTypes {
  [BridgeEvents.RoomData]: { roomData: Room; userId: string };
  [BridgeEvents.SceneReady]: void;
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
