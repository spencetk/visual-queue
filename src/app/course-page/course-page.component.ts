import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../_services/course.service';
import {UserService} from '../_services/user.service';
import {AuthService} from '../_services';
import {User} from '../_models/user';
import {MatTableDataSource} from '@angular/material/table';
import {Course} from '../_models/course';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent implements OnInit {

  courseId: string;
  userId: string;
  course: Course;

  report = [{username: 'orlando', firstName: 'Orlando', lastName: 'Bloom', hours: 'MWF 10am - 12pm', status: 'ONLINE', queue: '1234'},
    {username: 'bobert', firstName: 'Bobert', lastName: 'Jenkins', hours: 'TR 2pm-4pm', status: 'OFFLINE', queue: '1235'},
    {username: 'dan', firstName: 'Daniel', lastName: 'Van', hours: 'MW 2:30am - 3:30pm', status: 'OFFLINE', queue: '1236'}];

  user: User;
  dataSource;
  displayedColumns: string[] = ['pid', 'firstName', 'lastName', 'hours', 'status' , 'queue'];

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private authService: AuthService, private courseService: CourseService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.route.params.subscribe(params =>
    {
      this.courseId = params.courseID;
      this.userId = params.studentID;
    });

    this.dataSource = new MatTableDataSource(this.report);

  }

  // tslint:disable-next-line:typedef
  viewCourseRoster() {
    this.router.navigate(['/course-roster', {courseID: this.courseId, studentID: this.userId}]);
  }

  // tslint:disable-next-line:typedef
  enterQueuePage(ta) {
    this.router.navigate(['/queue-page', {courseID: this.courseId, taID: ta, studentID: this.userId}]);
  }

  // tslint:disable-next-line:typedef
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
