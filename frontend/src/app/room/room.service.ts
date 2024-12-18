import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GlobalDataService, GlobalMapKeys } from '../core/global.data.service';
import { HttpClient } from '@angular/common/http';
import { Room } from '../shared/common.interface';
import { environment } from '../environment/environment';
import { IOtherUserMovement, IUserMovement } from './room.interface';

@Injectable()
export class RoomService {
  public socket$: Subject<IOtherUserMovement> = new Subject();
  private socket!: WebSocket;

  constructor(private globalService: GlobalDataService, private http: HttpClient){}

  public connect(roomId: string) {
    const url = `ws://localhost:8000/ws?roomId=${roomId}`;
    this.socket = new WebSocket(url);
    if (this.socket) {
      this.socket.onmessage = (msg: MessageEvent) => {
        this.socket$.next(JSON.parse(msg.data));
      };
    }
  }
  public sendMessage(userMovementData: IUserMovement) {
    this.socket.send(
      JSON.stringify({
        userId: this.globalService.getData(GlobalMapKeys.UserId) || "67436bac581b05bdb812968b",
        posx: userMovementData.posx,
        posy: userMovementData.posy,
      })
    );
  }

  public getRoomData(roomId: string){
    return this.http.get<Room>(`${environment.backendBaseUrl}/room?roomId=${roomId}`)
  }
}
