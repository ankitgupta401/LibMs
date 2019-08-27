import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveLayComponent } from './receive-lay.component';

describe('ReceiveLayComponent', () => {
  let component: ReceiveLayComponent;
  let fixture: ComponentFixture<ReceiveLayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveLayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveLayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
