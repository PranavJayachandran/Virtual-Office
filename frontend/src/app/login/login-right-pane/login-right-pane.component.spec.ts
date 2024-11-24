import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRightPaneComponent } from './login-right-pane.component';

describe('LoginRightPaneComponent', () => {
  let component: LoginRightPaneComponent;
  let fixture: ComponentFixture<LoginRightPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginRightPaneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRightPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
