import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService, NotificationService} from '../_services';
import {ActivatedRoute} from '@angular/router';
import {QueueService} from '../_services/queue.service';

@Component({
  selector: 'app-queue-page',
  templateUrl: './queue-page.component.html',
  styleUrls: ['./queue-page.component.css']
})
export class QueuePageComponent implements OnInit {

  displayedColumns: string[] = ['pid', 'topic'];
  courseId;
  taID;
  studentID;

  inLine = false;
  spaces;

  report = [];
  dataSource;
  constructor(private queueService: QueueService, private notifService: NotificationService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>
    {
      this.courseId = params.courseID;
      this.studentID = params.studentID;
      this.taID = params.taID;
    });
    this.report = this.queueService.queueList;
    this.dataSource = new MatTableDataSource(this.report);
  }

  // tslint:disable-next-line:typedef
  hopInQueue() {
    this.inLine = true;
    this.report.push({username: this.authService.currentUserValue.username, topic: 'general assistance'});
    this.spaces = this.report.length;
    this.dataSource = new MatTableDataSource(this.report);
  }

  // tslint:disable-next-line:typedef
  hopOutOfQueue() {
    this.inLine = false;
    this.report.pop();
    this.dataSource = new MatTableDataSource(this.report);
  }

}
