import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppSidebarNavLinkComponent } from './ast-sidebar-nav-link.component';

describe('AppSidebarNavLinkComponent', () => {
  let component: AppSidebarNavLinkComponent;
  let fixture: ComponentFixture<AppSidebarNavLinkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSidebarNavLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSidebarNavLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
