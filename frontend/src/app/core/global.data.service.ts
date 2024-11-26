import { Injectable } from "@angular/core";
import { Room } from "../shared/common.interface";

export enum GlobalMapKeys {
    UserId,
    Room
}

interface GlobalMapTypes{
    [GlobalMapKeys.UserId]: string,
    [GlobalMapKeys.Room]: Room
}

@Injectable({
    providedIn:"root"
})
export class GlobalDataService{
    private map: {
        [K in keyof GlobalMapTypes]? : GlobalMapTypes[K];
    } = {};

    public addData<T extends keyof GlobalMapTypes>(type: T, data: GlobalMapTypes[T]){
        this.map[type] = data;
    }
    public getData<T extends keyof GlobalMapTypes>(type: T): GlobalMapTypes[T] | undefined{
        return this.map[type];
    }
}