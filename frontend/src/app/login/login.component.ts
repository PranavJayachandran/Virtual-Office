import { Component } from '@angular/core';
import { LoginLeftPaneComponent } from "./login-left-pane/login-left-pane.component";
import { LoginRightPaneComponent } from "./login-right-pane/login-right-pane.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginLeftPaneComponent, LoginRightPaneComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
