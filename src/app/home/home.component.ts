import {Component, OnInit} from '@angular/core';
import {CourseService} from '../_services/course.service';
import {UserService} from '../_services/user.service';
import {AuthService, NotificationService} from '../_services';
import {Router} from '@angular/router';
import {Role} from '../_models/role';
import {User} from '../_models/user';
import {Course} from '../_models/course';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;
  courses: Course[];

  constructor(private courseService: CourseService,
              private userService: UserService,
              public authService: AuthService,
              private notifService: NotificationService,
              private router: Router) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.loadMyCourses();
  }

  // tslint:disable-next-line:typedef
  private loadMyCourses() {

    this.userService.getMyCourses(this.currentUser._id).subscribe(
      courses => {this.courses = courses;
                  console.log(courses.length); },
      error => {this.notifService.showNotif(error, 'error'); }
      );
  }

  // tslint:disable-next-line:typedef
  viewOfficeHours(id: string) {
    this.router.navigate(['/course-page', {courseID: id, studentID: this.currentUser._id}]);
  }

  // tslint:disable-next-line:typedef
  deleteCourse(id: string) {
    this.courseService.delete(id).pipe(first()).subscribe(() => {
      this.courses = null;
      this.loadMyCourses();
    });
  }

}
