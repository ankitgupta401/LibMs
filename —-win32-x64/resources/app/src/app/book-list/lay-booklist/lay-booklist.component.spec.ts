import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayBooklistComponent } from './lay-booklist.component';

describe('LayBooklistComponent', () => {
  let component: LayBooklistComponent;
  let fixture: ComponentFixture<LayBooklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayBooklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayBooklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
