import { Injectable } from '@angular/core';
import { Room } from '../shared/common.interface';
import { UserService } from './user.service';

export enum GlobalMapKeys {
  UserId,
  Room,
  RoomId
}

interface GlobalMapTypes {
  [GlobalMapKeys.UserId]: string;
  [GlobalMapKeys.Room]: Room;
  [GlobalMapKeys.RoomId]: string;

}

@Injectable({
  providedIn: 'root',
})
export class GlobalDataService {
  private map: {
    [K in keyof GlobalMapTypes]?: GlobalMapTypes[K];
  } = {};

  constructor(private userService: UserService) {}

  public addData<T extends keyof GlobalMapTypes>(
    type: T,
    data: GlobalMapTypes[T]
  ) {
    window.localStorage.setItem(type.toString(), JSON.stringify(data));
    this.map[type] = data;
  }
  public getData<T extends keyof GlobalMapTypes>(
    type: T
  ): GlobalMapTypes[T] | undefined {
    if (!this.map[type]) {
      const item = window.localStorage.getItem(type.toString());
      if (item != null) {
        this.map[type] = JSON.parse(item);
      }
    }
    return this.map[type];
  }
}
