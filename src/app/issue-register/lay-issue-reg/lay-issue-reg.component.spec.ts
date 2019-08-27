import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayIssueRegComponent } from './lay-issue-reg.component';

describe('LayIssueRegComponent', () => {
  let component: LayIssueRegComponent;
  let fixture: ComponentFixture<LayIssueRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayIssueRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayIssueRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
