import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { NotificationService } from '../_services/notification.service';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';

@Component({templateUrl: 'register.component.html',

  styleUrls: ['register.component.css']

})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  roles = [];


  constructor(
    // private patternValidator: PatternValidator,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private notification: NotificationService
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      role: [''],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      courses: ['']

    });

    this.roles = [{name: 'Student'},
      {name: 'Professor'}];
  }

  // convenience getter for easy access to form fields
  // tslint:disable-next-line:typedef
  get f() {
    return this.registerForm.controls; }

  // tslint:disable-next-line:typedef
  onSubmit() {
    // if (this.registerForm.invalid) {
    //   console.log('Error in onSubmit()');
    //   return;
    // }

    //this.notification.showNotif('NOT IMPLEMENTED (YET)');

    this.submitted = true;
    // stop here if form is invalid
    this.registerForm.value.courses = [];

    if (this.registerForm.invalid) {
      console.log('Error in onSubmit()');
      return;
    }

    this.loading = true;
    console.log(this.registerForm.value);
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          // this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          console.log('Error:', error);
          this.notification.showNotif(error);
          this.loading = false;
        });
  }
}

