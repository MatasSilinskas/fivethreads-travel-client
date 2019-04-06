import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleCellComponent } from './role-cell.component';

describe('RoleCellComponent', () => {
  let component: RoleCellComponent;
  let fixture: ComponentFixture<RoleCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
