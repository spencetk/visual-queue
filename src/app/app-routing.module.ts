import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from './_guards/auth_guard';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {RegisterCourseComponent} from './register-course/register-course.component';
import {Role} from './_models/role';
import {JoinCourseComponent} from './join-course/join-course.component';
import {AdminComponent} from './admin/admin.component';
import {CoursePageComponent} from './course-page/course-page.component';
import {CourseRosterListComponent} from './course-roster-list/course-roster-list.component';
import {QueuePageComponent} from './queue-page/queue-page.component';

const routes: Routes = [{path: '', component: HomeComponent, canActivate: [AuthGuard]}, {path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [Role.professor]}},
  { path: 'register-course', component: RegisterCourseComponent, canActivate: [AuthGuard], data: { roles: [Role.professor] }},
  { path: 'join-course', component: JoinCourseComponent, data: {roles: [Role.student]}},
  { path: 'course-page', component: CoursePageComponent, data: {roles: [Role.professor, Role.student]}},
  { path: 'course-roster', component: CourseRosterListComponent, data: {roles: [Role.professor, Role.student]}},
  { path: 'queue-page', component: QueuePageComponent, data: {roles: [Role.professor, Role.student]}},
  { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
