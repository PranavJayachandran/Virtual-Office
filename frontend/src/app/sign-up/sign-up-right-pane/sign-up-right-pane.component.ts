import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { SignUpRightPaneService } from './sign-up-right-pane.service';
import { User } from '../../shared/common.interface';
import { userNameAlreadyTaken } from '../../shared/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  GlobalDataService,
  GlobalMapKeys,
} from '../../core/global.data.service';
import {UserService} from "../../core/user.service";

@Component({
  selector: 'app-sign-up-right-pane',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up-right-pane.component.html',
  styleUrl: './sign-up-right-pane.component.scss',
  providers: [SignUpRightPaneService],
})
export class SignUpRightPaneComponent {
  constructor(
    private signUpService: SignUpRightPaneService,
    private router: Router,
    private userService: UserService,
  ) {}
  public signUpForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    rememberMe: new FormControl(''),
  });
  public errorMessage = '';
  public onSubmit() {
    this.errorMessage = '';
    const user: User = {
      userName: this.signUpForm.value.userName || '',
      password: this.signUpForm.value.password || '',
    };
    this.signUpService.signUp(user).subscribe(
      (id: string) => {
        this.userService.saveUserId(id);
        this.router.navigate(['enter-room']);
      },
      (err) => {
        this.errorMessage = err.Error();
      }
    );
  }
}
