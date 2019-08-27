import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibCardRegComponent } from './lib-card-reg.component';

describe('LibCardRegComponent', () => {
  let component: LibCardRegComponent;
  let fixture: ComponentFixture<LibCardRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibCardRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibCardRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
