import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayDashboardComponent } from './lay-dashboard.component';

describe('LayDashboardComponent', () => {
  let component: LayDashboardComponent;
  let fixture: ComponentFixture<LayDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
