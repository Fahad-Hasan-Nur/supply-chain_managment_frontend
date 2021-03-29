import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppSidebarNavLabelComponent } from './app-sidebar-nav-label.component';

describe('AppSidebarNavLabelComponent', () => {
  let component: AppSidebarNavLabelComponent;
  let fixture: ComponentFixture<AppSidebarNavLabelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSidebarNavLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSidebarNavLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
