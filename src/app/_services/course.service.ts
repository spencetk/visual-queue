
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Course } from '../_models/course';




@Injectable({ providedIn: 'root' })
export class CourseService {
  constructor(private http: HttpClient) { }

  getAll() {
    console.log('getAll()');
    return this.http.get<Course[]>(`http://localhost:4000/course/getcourses`);
  }

  // tslint:disable-next-line:typedef
  getEnrolledStudents(courseID: string) {
    return this.http.get<any>(`http://localhost:4000/course/getstudents${courseID}`);
  }


  // tslint:disable-next-line:typedef
  delete(id: string) {
    return this.http.delete(`http://localhost:4000/course/${id}`);

  }

  // tslint:disable-next-line:typedef
  createCourse(course: Course) {
    console.log('createCourse');
    return this.http.post('http://localhost:4000/course/addcourse', course);

  }


}
