import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentService } from './../../services/student.service';
import { Subscription } from 'rxjs';
import { Student } from './../../models/student.models';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-students-edit',
  templateUrl: './students-edit.component.html',
  styleUrls: ['./students-edit.component.css']
})
export class StudentsEditComponent implements OnInit, OnDestroy {

  public student : Student;
	public subscription : Subscription;
	public subscriptionParams : Subscription;

  constructor(
  	public studentService : StudentService,
  	public routerService : Router,
  	public activatedRoute : ActivatedRoute
  	) { }

  ngOnInit(): void {
  	this.student = new Student();
  	this.loadData();
  }

  loadData(){
  	this.subscriptionParams = this.activatedRoute.params.subscribe((data : Params) =>{
  		let massv = data['massv'];
  		this.subscription = this.studentService.getStudent(massv).subscribe((student : Student) =>{
  			this.student = student;
  		});

  	});
  }

  ngOnDestroy(){
  	if(this.subscription){
  		this.subscription.unsubscribe();
  	}
  	if(this.subscriptionParams){
  		this.subscriptionParams.unsubscribe();
  	}
  }

  onEditStudent(){
  	this.subscription = this.studentService.updateStudent(this.student).subscribe(data =>{
  		this.routerService.navigateByUrl('/students');
  	})
  }

}
