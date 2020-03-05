import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCardLayComponent } from './new-card-lay.component';

describe('NewCardLayComponent', () => {
  let component: NewCardLayComponent;
  let fixture: ComponentFixture<NewCardLayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCardLayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCardLayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
