import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import {Course} from '../_models/course';
import {CourseService} from '../_services/course.service';

@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {
  users: User[] = [];
  courses: Course[] = [];

  constructor(private userService: UserService, private courseService: CourseService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    console.log('admin component');
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });

    this.courseService.getAll().pipe(first()).subscribe(courses => {
      this.courses = courses;
    });

  }
}
