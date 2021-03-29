import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CompletedRequisitionComponent } from './completed-requisition.component';

describe('CompletedRequisitionComponent', () => {
  let component: CompletedRequisitionComponent;
  let fixture: ComponentFixture<CompletedRequisitionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedRequisitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
