import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class UserService{
    public saveUserId(userId: string){
        window.localStorage.setItem("UserId",userId);      
    }
    public getUserId(){
        return window.localStorage.getItem("UserId")?? "";
    }
}