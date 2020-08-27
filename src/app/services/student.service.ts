import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from './../models/student.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

	public API: string = 'https://serverstudent.herokuapp.com';

  constructor(public http: HttpClient) { }

  getAllStudent(): Observable<Student[]> {
		return this.http.get<Student[]>(this.API+'/getAll');
	}

	getStudent(massv : string): Observable<Student> {
		return this.http.get<Student>(`${this.API+`/find${massv}`}`);
	}

	addStudent(student: Student): Observable<Student> {
		return this.http.post<Student>(this.API, student);
	}

	updateStudent(student : Student) : Observable<Student>{
		return this.http.put<Student>(`${this.API}/update`, student);
	}

	deleteStudent(massv: string): Observable<Student> {
		return this.http.delete<Student>(`${this.API}/delete${massv}`);
	}
}
