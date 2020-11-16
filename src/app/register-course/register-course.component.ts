import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CourseService} from '../_services/course.service';
import {NotificationService} from '../_services';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-register-course',
  templateUrl: './register-course.component.html',
  styleUrls: ['./register-course.component.css']
})

export class RegisterCourseComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private notifcation: NotificationService,
    private router: Router,
  ) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      courseNumber: ['', [Validators.required, Validators.min(1000), Validators.max(9999)]],
      courseDept: ['', [Validators.required, Validators.pattern('^[A-Z]{2,4}$')]],
      accessCode: [Math.floor(1000000 + Math.random() * 9000000), Validators.pattern('^[1-9][0-9]{6}$')],
      tas: [''],
      courseRoster: ['']
    });
  }

  // getter for easy access to form fields
  // tslint:disable-next-line:typedef
  get f() {
    return this.registerForm.controls;
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      console.log('Error in onSubmit()');
      return;
    }
    this.registerForm.value.courseRoster = [];
    this.registerForm.value.tas = [];
    this.loading = true;
    this.courseService.createCourse(this.registerForm.value).pipe(first()).subscribe(() => {
      this.router.navigate(['/']);
    }, error => {
      console.log('Error:', error);
      this.notifcation.showNotif(error);
      this.loading = false;
    });
  }


}

