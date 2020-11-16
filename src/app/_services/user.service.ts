
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';
import {Observable} from 'rxjs';
import {Course} from '../_models/course';




@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getAll() {
    console.log('getAll()');
    return this.http.get<User[]>(`http://localhost:4000/user/allusers`);
  }



  // tslint:disable-next-line:typedef
  register(user: User) {
    return this.http.post(`http://localhost:4000/user/register`, user);
  }


  // TODO: make a post request that will simply send a json like this {courseid: id}
  // tslint:disable-next-line:typedef
  registerCourse(code: number) {
    console.log('registerCourse');
    return this.http.post(`http://localhost:4000/user/registercourse`, {accessCode: code});

  }

  // tslint:disable-next-line:typedef
  getMyCourses(userId: string) {
    console.log('getMyCourses');
    return this.http.get<Course[]>(`http://localhost:4000/user/getcourses${userId}`);
  }




}
