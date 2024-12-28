import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideocallStartButtonComponent } from './videocall-start-button.component';

describe('VideocallStartButtonComponent', () => {
  let component: VideocallStartButtonComponent;
  let fixture: ComponentFixture<VideocallStartButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideocallStartButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideocallStartButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
