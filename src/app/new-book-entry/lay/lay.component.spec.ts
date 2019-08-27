import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayComponent } from './lay.component';

describe('LayComponent', () => {
  let component: LayComponent;
  let fixture: ComponentFixture<LayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
