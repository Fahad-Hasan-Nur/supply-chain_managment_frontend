import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMemberDialogComponent } from './view-member-dialog.component';

describe('ViewMemberDialogComponent', () => {
  let component: ViewMemberDialogComponent;
  let fixture: ComponentFixture<ViewMemberDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMemberDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMemberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
