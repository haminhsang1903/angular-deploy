import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentService } from './../../services/student.service';
import { Subscription } from 'rxjs';
import { Student } from './../../models/student.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students-add',
  templateUrl: './students-add.component.html',
  styleUrls: ['./students-add.component.css']
})
export class StudentsAddComponent implements OnInit, OnDestroy {

  public student : Student;
	public subscription : Subscription;

  constructor(
  	public studentService : StudentService,
  	public routerService : Router
  	) { }

  ngOnInit(): void {
  	this.student = new Student();
  }

  ngOnDestroy(){
  	if(Subscription){
  		this.subscription.unsubscribe();
  	}
  }

  onAddStudent(){
    this.subscription = this.studentService.addStudent(this.student).subscribe(data =>{
      if(data && data.massv){
        this.routerService.navigate(['courses'])
      }
    })
  }

}
