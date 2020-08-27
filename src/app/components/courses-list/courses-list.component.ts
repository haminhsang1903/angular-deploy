import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoursesService } from './../../services/courses.service';
import { Subscription } from 'rxjs';
import { Course } from './../../models/courses.models';

@Component({
    selector: 'app-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit, OnDestroy {

    public subscription: Subscription;
    public courses: Course[] = [];

    constructor(public coursesService: CoursesService) { }

    ngOnInit(): void {
        this.subscription = this.coursesService.getAllCourses().subscribe(data => {
            this.courses = data;
        })
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onDeleteCourse(id: number) {
        this.subscription = this.coursesService.deleteCourse(id).subscribe(data => {
            this.upDataAfterDelete(id);
        });
    }

    upDataAfterDelete(id: number) {
        let result = 0;
        for (var i = 0; i < this.courses.length; i++) {
            if (this.courses[i].id == id) {
                this.courses.splice(i, 1);
                break;
            }
        }
    }

}
