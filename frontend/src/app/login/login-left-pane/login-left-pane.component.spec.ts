import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLeftPaneComponent } from './login-left-pane.component';

describe('LoginLeftPaneComponent', () => {
  let component: LoginLeftPaneComponent;
  let fixture: ComponentFixture<LoginLeftPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginLeftPaneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginLeftPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
