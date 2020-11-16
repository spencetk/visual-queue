import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from '../_models/course';
import {AuthService, NotificationService} from '../_services';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @Input() course: Course;
  @Output() deleteEvent = new EventEmitter<string>();
  @Output() seeOfficeHoursEvent = new EventEmitter<string>();

  registeredList: string[];
  userRole = '';

  constructor(private notifService: NotificationService, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(x => {
      if (x) {
        this.registeredList = x.courses;
        this.userRole = x.role;
      }}

    );
  }

  // tslint:disable-next-line:typedef
  delete(id) {
    this.deleteEvent.emit(id);
  }

  // tslint:disable-next-line:typedef
  seeOfficeHours(id: string) {
    this.seeOfficeHoursEvent.emit(id);
  }



}
