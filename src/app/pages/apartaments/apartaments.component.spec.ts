import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartamentsComponent } from './apartaments.component';

describe('ApartamentsComponent', () => {
  let component: ApartamentsComponent;
  let fixture: ComponentFixture<ApartamentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApartamentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
