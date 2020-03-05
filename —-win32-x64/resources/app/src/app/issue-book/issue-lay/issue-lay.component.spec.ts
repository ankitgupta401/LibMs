import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueLayComponent } from './issue-lay.component';

describe('IssueLayComponent', () => {
  let component: IssueLayComponent;
  let fixture: ComponentFixture<IssueLayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueLayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueLayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
