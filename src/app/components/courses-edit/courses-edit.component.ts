import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoursesService } from './../../services/courses.service';
import { Subscription } from 'rxjs';
import { Course } from './../../models/courses.models';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-courses-edit',
  templateUrl: './courses-edit.component.html',
  styleUrls: ['./courses-edit.component.css']
})
export class CoursesEditComponent implements OnInit, OnDestroy {
	public course : Course;
	public subscription : Subscription;
	public subscriptionParams : Subscription;

  constructor(
  	public coursesService : CoursesService,
  	public routerService : Router,
  	public activatedRoute : ActivatedRoute
  	) { }

  ngOnInit(): void {
  	this.course = new Course();
  	this.loadData();
  }

  loadData(){
  	this.subscriptionParams = this.activatedRoute.params.subscribe((data : Params) =>{
  		let id = data['id'];
  		this.subscription = this.coursesService.getCourse(id).subscribe((course : Course) =>{
  			this.course = course;
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

  onEditCourse(){
  	this.subscription = this.coursesService.updateCourse(this.course).subscribe(data =>{
  		this.routerService.navigateByUrl('/courses');
  	})
  }

}
