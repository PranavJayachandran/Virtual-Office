import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpRightPaneComponent } from './sign-up-right-pane.component';

describe('SignUpRightPaneComponent', () => {
  let component: SignUpRightPaneComponent;
  let fixture: ComponentFixture<SignUpRightPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpRightPaneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpRightPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
