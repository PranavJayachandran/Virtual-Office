import { Component, OnInit } from '@angular/core';
import { BridgeEvents, BridgeService } from '../canvas/bridge';

@Component({
  selector: 'app-videocall',
  standalone: true,
  imports: [],
  templateUrl: './videocall.component.html',
  styleUrl: './videocall.component.scss'
})
export class VideocallComponent implements OnInit{

  private neighbourUserId : string = "";
  constructor(private bridgeEventBus: BridgeService){}

  ngOnInit(): void {
    this.bridgeEventBus.on(BridgeEvents.UserInNeighbourHood).subscribe((data : {userId : string})=>{
      this.neighbourUserId = data.userId;
    })
  }
}
