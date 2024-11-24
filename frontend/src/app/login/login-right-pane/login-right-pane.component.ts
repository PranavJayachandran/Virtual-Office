import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRightPaneService } from './login-right-pane.service';
import { User } from '../../shared/common.interface';
import { HttpClient } from '@angular/common/http';
import { successFullLogin, userNameAlreadyTaken } from '../../shared/common';

@Component({
  selector: 'app-login-right-pane',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-right-pane.component.html',
  styleUrl: './login-right-pane.component.scss',
  providers: [LoginRightPaneService]
})
export class LoginRightPaneComponent {
  public loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    rememberMe: new FormControl(''),
  });
  constructor(private router:Router, private loginService: LoginRightPaneService){}
  public onSubmit(){
    //Check the validity of the credentials
    const user : User = {
      userName: this.loginForm.value.userName ||  "",
      password: this.loginForm.value.password || ""
    }
    this.loginService.login(user).subscribe((data)=>{
      if(data.msg == successFullLogin){
        this.router.navigate(['/enter-room'])
      }
      else if (data.msg == userNameAlreadyTaken){
        this.loginForm.reset();
      }
    });
  }
}
