import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecRegLayComponent } from './rec-reg-lay.component';

describe('RecRegLayComponent', () => {
  let component: RecRegLayComponent;
  let fixture: ComponentFixture<RecRegLayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecRegLayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecRegLayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
