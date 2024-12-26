import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../../shared/common.interface';
import { environment } from '../../environment/environment';
import {
  GlobalDataService,
  GlobalMapKeys,
} from '../../core/global.data.service';
import { UserService } from '../../core/user.service';

@Injectable()
export class EnterRoomService {
  public backendUrl = environment.backendBaseUrl;
  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}
  public createRoom(x: number, y: number): Observable<{ id: string }> {
    return this.http.put<{ id: string }>(
      `${this.backendUrl}/room`,
      { userId: this.userService.getUserId() },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  public joinRoom(id: string): Observable<Room> {
    const roomData = {
      roomId: id,
      userId: this.userService.getUserId(),
    };
    return this.http.post<Room>(`${this.backendUrl}/room`, roomData, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
