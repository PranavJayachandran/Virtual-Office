import { Component, Input, OnInit } from '@angular/core';
import { slideInOut } from '../../shared/animations/slideinout';
import { User } from '../../shared/common.interface';

@Component({
  selector: 'app-videocall-request-toaster',
  standalone: true,
  imports: [],
  templateUrl: './videocall-request-toaster.component.html',
  styleUrl: './videocall-request-toaster.component.scss',
  animations: [slideInOut]
})
export class VideocallRequestToasterComponent implements OnInit {
  @Input() user: User | null = null;
  destroySelf!: () => void;

  ngOnInit(): void {
    setTimeout(() => {
      this.destroySelf();
    }, 4000);
  }
  close() {
    this.destroySelf();
  }
  acceptVideoCallRequest() {
    ;
  }
}
