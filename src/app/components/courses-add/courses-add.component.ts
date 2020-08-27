import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoursesService } from './../../services/courses.service';
import { Subscription } from 'rxjs';
import { Course } from './../../models/courses.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-add',
  templateUrl: './courses-add.component.html',
  styleUrls: ['./courses-add.component.css']
})
export class CoursesAddComponent implements OnInit, OnDestroy {
	public course : Course;
	public subscription : Subscription;

  urls = ['./../assets'];

  constructor(
  	public coursesService : CoursesService,
  	public routerService : Router
  	) { }

  ngOnInit(): void {
  	this.course = new Course();
  }

  ngOnDestroy(){
  	if(Subscription){
  		this.subscription.unsubscribe();
  	}
  }

  onAddCourse(){
  	this.subscription = this.coursesService.addCourse(this.course).subscribe(data =>{
  		if(data && data.id){
  			this.routerService.navigate(['courses'])
  		}
  	})
  }

  onselectFile(e){
    if(e.target.files){
      for(let i=0; i < File.length; i++){
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.onload=(events:any)=>{
          this.urls.push(events.target.result);
        }
      }
    }

  }

}
