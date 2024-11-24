import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EnterRoomComponent } from './room/enter-room/enter-room.component';
import { RoomComponent } from './room/room.component';

export const routes: Routes = [
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'sign-up', component: SignUpComponent
    },
    {
        path: 'enter-room', component: EnterRoomComponent
    },
    {
        path: 'room', component: RoomComponent
    }
];
