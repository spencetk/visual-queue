import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../_services';
import {Router} from '@angular/router';
import {CourseService} from '../_services/course.service';
import {UserService} from '../_services/user.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-join-course',
  templateUrl: './join-course.component.html',
  styleUrls: ['./join-course.component.css']
})
export class JoinCourseComponent implements OnInit {
  accessCodeForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private courseService: CourseService,
              private router: Router,
              private notification: NotificationService) { }

  ngOnInit(): void {
    this.accessCodeForm = this.formBuilder.group(
      {accessCode: ['', Validators.required]}
    );
  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.accessCodeForm.controls;
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.submitted = true;

    if (this.accessCodeForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.registerCourse(this.accessCodeForm.value.accessCode).pipe(first()).subscribe(() => {
      this.router.navigate(['/']);
      this.notification.showNotif('now enrolled in course!', 'confirmation');
    }, error => {
      console.log('Error:', error);
      this.notification.showNotif(error);
      this.loading = false;
    });

  }

}


