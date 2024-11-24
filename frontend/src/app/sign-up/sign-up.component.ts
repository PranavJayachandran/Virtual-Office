import { Component } from '@angular/core';
import { SignUpLeftPaneComponent } from "./sign-up-left-pane/sign-up-left-pane.component";
import { SignUpRightPaneComponent } from "./sign-up-right-pane/sign-up-right-pane.component";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [SignUpLeftPaneComponent, SignUpRightPaneComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

}
