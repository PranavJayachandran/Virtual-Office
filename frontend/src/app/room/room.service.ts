import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GlobalDataService, GlobalMapKeys } from '../core/global.data.service';
import { HttpClient } from '@angular/common/http';
import { Room } from '../shared/common.interface';
import { environment } from '../environment/environment';
import { IUserMovement } from './room.interface';
import * as signalR from '@microsoft/signalr';
import { UserService } from '../core/user.service';
import { HubIncomingEventEnums, HubOutgoingEventEnums, HubService } from '../core/hub';

@Injectable()
export class RoomService {
  public socket$: Subject<IUserMovement> = new Subject();
  private socket!: WebSocket;
  private hubConnection!: signalR.HubConnection;
  private currentRoom: string = '';
  private userId: string = "";

  constructor(private userService: UserService, private http: HttpClient, private hubService: HubService) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.socketUrl + '/roomHub')
      .build();
  }
  public connect(roomId: string) {
    this.currentRoom = roomId;
    this.userId = this.userService.getUserId();
    this.hubService.invokeAsync(HubOutgoingEventEnums.JoinRoom, roomId, this.userId);
    this.hubService.on(HubIncomingEventEnums.UserMovement).subscribe((message: any) => {
      this.socket$.next(message[0]);
    })
  }
  public sendMessage(userMovementData: IUserMovement) {
    this.hubService.invokeAsync(HubOutgoingEventEnums.SendMessageToRoom, this.currentRoom, {
      UserId: parseInt(this.userService.getUserId()),
      PosX: userMovementData.posX,
      PosY: userMovementData.posY,
    })
  }
  public getRoomData(roomId: string) {
    return this.http.get<Room>(
      `${environment.backendBaseUrl}/room?roomId=${roomId}`
    );
  }
}
