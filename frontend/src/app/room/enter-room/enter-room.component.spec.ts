import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterRoomComponent } from './enter-room.component';

describe('EnterRoomComponent', () => {
  let component: EnterRoomComponent;
  let fixture: ComponentFixture<EnterRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
