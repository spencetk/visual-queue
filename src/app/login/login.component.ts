import {Component, OnInit} from '@angular/core';
import { first } from 'rxjs/operators';


import {AuthService} from '../_services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../_services/notification.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({ templateUrl: 'login.component.html' ,
  styleUrls: ['login.component.css']})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  // convenience getter for easy access to form fields//346947  286166
  // tslint:disable-next-line:typedef
  get f()  { return this.loginForm.controls; }

  onSubmit(): void {


    if (this.loginForm.invalid) {
      return;
    }

    // // Simulation for Now
    // if ((this.f.username.value === 'prof' && this.f.password.value === '123456') ||
    //   (this.f.username.value === 'student' && this.f.password.value === '654321') ||
    //   (this.f.username.value === 'helper' && this.f.password.value === '123456'))
    // {
    //
    //   this.notification.showNotif('success', 'undo');
    //   this.router.navigate(['/']);
    //
    // }
    // else {
    //   this.notification.showNotif('no', 'undo');
    // }




    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
          // show a snackbar to user
          this.notification.showNotif(this.error, 'undo');
        });
  }
}

