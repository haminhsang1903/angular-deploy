import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentService } from './../../services/student.service';
import { Subscription } from 'rxjs';
import { Student } from './../../models/student.models';

@Component({
	selector: 'app-students-list',
	templateUrl: './students-list.component.html',
	styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit, OnDestroy {

	public subscription: Subscription;
	public students: Student[] = [];

	constructor(public studentService: StudentService) { }

	ngOnInit(): void {
		this.subscription = this.studentService.getAllStudent().subscribe(data => {
			this.students = data;
		})
	}

	ngOnDestroy() {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

	onDeleteStudent(massv: string) {
        this.subscription = this.studentService.deleteStudent(massv).subscribe(data => {
            this.upDataAfterDelete(massv);
        });
    }

    upDataAfterDelete(massv: string) {
        let result = 0;
        for (var i = 0; i < this.students.length; i++) {
            if (this.students[i].massv == massv) {
                this.students.splice(i, 1);
                break;
            }
        }
    }



}
