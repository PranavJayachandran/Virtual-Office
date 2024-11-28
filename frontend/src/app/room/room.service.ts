import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GlobalDataService, GlobalMapKeys } from '../core/global.data.service';

@Injectable()
export class RoomService {
  public socket$: Subject<{
    posx: number;
    posy: number;
    userId: string;
    oldx: number;
    oldy: number;
  }> = new Subject();
  private socket!: WebSocket;

  constructor(private globalService: GlobalDataService){}

  public connect(roomId: string) {
    const url = `ws://localhost:8000/ws?roomId=${roomId}`;
    this.socket = new WebSocket(url);
    if (this.socket) {
      this.socket.onmessage = (msg: MessageEvent) => {
        this.socket$.next(JSON.parse(msg.data));
      };
    }
  }
  public sendMessage(ox: number, oy: number, posx: number, posy: number) {
    console.log('Sending');
    this.socket.send(
      JSON.stringify({
        userId: this.globalService.getData(GlobalMapKeys.UserId) || "123",
        oldx: ox,
        oldy: oy,
        posx: posx,
        posy: posy,
      })
    );
  }
}
