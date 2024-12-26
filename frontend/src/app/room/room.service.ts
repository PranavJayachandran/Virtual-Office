import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GlobalDataService, GlobalMapKeys } from '../core/global.data.service';
import { HttpClient } from '@angular/common/http';
import { Room } from '../shared/common.interface';
import { environment } from '../environment/environment';
import { IOtherUserMovement, IUserMovement } from './room.interface';
import * as signalR from '@microsoft/signalr';
import { UserService } from '../core/user.service';

@Injectable()
export class RoomService {
  public socket$: Subject<IOtherUserMovement> = new Subject();
  private socket!: WebSocket;
  private hubConnection!: signalR.HubConnection;
  private currentRoom: string = '';

  constructor(private userService: UserService, private http: HttpClient) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.socketUrl+ '/roomHub')
      .build();
  }
  public connect(roomId: string) {
    this.currentRoom = roomId;
    this.hubConnection.start().then(()=>{
      this.hubConnection.invoke('JoinRoom', roomId);
      this.hubConnection.on(
        'UserMovement',
        (connectionId: string, message: any) => {
          this.socket$.next(message);
        }
      );
    });
  }
  public sendMessage(userMovementData: IUserMovement) {
    this.hubConnection.invoke('SendMessageToRoom', this.currentRoom, {
      UserId: parseInt(this.userService.getUserId()),
      PosX: userMovementData.posx,
      PosY: userMovementData.posy,
    });
  }

  public getRoomData(roomId: string) {
    return this.http.get<Room>(
      `${environment.backendBaseUrl}/room?roomId=${roomId}`
    );
  }
}
