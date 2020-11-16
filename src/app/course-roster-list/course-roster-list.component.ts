import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../_services/course.service';
import {User} from '../_models/user';
import {first} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-course-roster-list',
  templateUrl: './course-roster-list.component.html',
  styleUrls: ['./course-roster-list.component.css']
})
export class CourseRosterListComponent implements OnInit {

  courseId: string;
  userId: string;
  users: User[] = [];

  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'role'];

  report = [];
  dataSource;

  constructor(private route: ActivatedRoute, private courseService: CourseService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>
    {
      this.courseId = params.courseID;
      this.userId = params.studentID;
    });

    this.courseService.getEnrolledStudents(this.courseId).pipe(first()).subscribe(users => {
      this.users = users;

      users.forEach(user => this.report.push({username: user.username,
       firstName: user.firstName, lastName: user.lastName, role: user.role}));
      this.dataSource = new MatTableDataSource(this.report);

    });

  }



}
