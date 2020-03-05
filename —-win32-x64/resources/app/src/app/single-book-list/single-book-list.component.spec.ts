import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBookListComponent } from './single-book-list.component';

describe('SingleBookListComponent', () => {
  let component: SingleBookListComponent;
  let fixture: ComponentFixture<SingleBookListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleBookListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
