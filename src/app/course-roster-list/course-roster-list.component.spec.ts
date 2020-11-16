import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseRosterListComponent } from './course-roster-list.component';

describe('CourseRosterListComponent', () => {
  let component: CourseRosterListComponent;
  let fixture: ComponentFixture<CourseRosterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseRosterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseRosterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
