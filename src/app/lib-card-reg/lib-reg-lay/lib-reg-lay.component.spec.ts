import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibRegLayComponent } from './lib-reg-lay.component';

describe('LibRegLayComponent', () => {
  let component: LibRegLayComponent;
  let fixture: ComponentFixture<LibRegLayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibRegLayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibRegLayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
