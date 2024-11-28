import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../../shared/common.interface';
import { environment } from '../../environment/environment';
import {
  GlobalDataService,
  GlobalMapKeys,
} from '../../core/global.data.service';

@Injectable()
export class EnterRoomService {
  public backendUrl = environment.backendBaseUrl;
  constructor(
    private http: HttpClient,
    private globalService: GlobalDataService
  ) {}
  public createRoom(x: number, y: number): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(`${this.backendUrl}/create-room`, {ownerId: this.globalService.getData(GlobalMapKeys.UserId) || "1", x: x,y :y, direction: "UP"}, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  public joinRoom(id: string): Observable<Room> {
    const roomData = {
        roomId: id,
        memberId : this.globalService.getData(GlobalMapKeys.UserId) || "2",
        x: 0,
        y: 0,
        direction: "Up"
    }
    return this.http.post<Room>(`${this.backendUrl}/join-room`,roomData, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}