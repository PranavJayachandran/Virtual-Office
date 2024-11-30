import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class UserService{
    public saveUser(userId: string){
        window.localStorage.setItem("UserId",userId);      
    }
    public getUser(){
        return window.localStorage.getItem("UserId")?? "";
    }
}