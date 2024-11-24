import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpLeftPaneComponent } from './sign-up-left-pane.component';

describe('SignUpLeftPaneComponent', () => {
  let component: SignUpLeftPaneComponent;
  let fixture: ComponentFixture<SignUpLeftPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpLeftPaneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpLeftPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
