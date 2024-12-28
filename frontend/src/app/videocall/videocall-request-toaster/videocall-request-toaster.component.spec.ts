import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideocallRequestToasterComponent } from './videocall-request-toaster.component';

describe('VideocallRequestToasterComponent', () => {
  let component: VideocallRequestToasterComponent;
  let fixture: ComponentFixture<VideocallRequestToasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideocallRequestToasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideocallRequestToasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
