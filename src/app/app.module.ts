import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';

import { HomeComponent } from './components/home/home.component';
//Course
import { CoursesComponent } from './components/courses/courses.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesAddComponent } from './components/courses-add/courses-add.component';
import { CoursesEditComponent } from './components/courses-edit/courses-edit.component';
//service
import { CoursesService } from './services/courses.service';
import { StudentService } from './services/student.service';
//Student
import { StudentsComponent } from './components/students/students.component';
import { StudentsAddComponent } from './components/students-add/students-add.component';
import { StudentsEditComponent } from './components/students-edit/students-edit.component';
import { StudentsListComponent } from './components/students-list/students-list.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'courses',
    component: CoursesComponent,
    children : [
      {
        path: '',
        component: CoursesListComponent
      },
      {
        path: ':id/edit',
        component: CoursesEditComponent
      },
      {
        path: 'add',
        component: CoursesAddComponent
      }
    ] 
  },
  {
    path: 'students',
    component: StudentsComponent,
    children : [
      {
        path: '',
        component: StudentsListComponent
      },
      {
        path: ':massv/edit',
        component: StudentsEditComponent
      },
      {
        path: 'add',
        component: StudentsAddComponent
      }
    ] 
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    HomeComponent,
    CoursesListComponent,
    CoursesAddComponent,
    CoursesEditComponent,
    StudentsComponent,
    StudentsAddComponent,
    StudentsEditComponent,
    StudentsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    CoursesService,
    StudentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
