import {Injectable} from '@angular/core';


@Injectable({ providedIn: 'root' })
export class QueueService {
  queue;

  constructor() {

    this.queue = [
      {username: 'parker', topic: 'Project 5 Help'},
      {username: 'kennedy', topic: 'Lab 13 Issues'},
      {username: 'devin', topic: 'malloc not working in Greenfoot'}
    ];
  }

  // tslint:disable-next-line:typedef
  get queueList() {
    return this.queue;
  }





}
