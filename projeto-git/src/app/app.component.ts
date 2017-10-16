import { Project } from './project/project.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  // this.http.get<Project>('http://localhost:5000/projects/0').subscribe(data => {
    // console.log(data.name);
  // console.log(data.url);
    //  console.log(data.commits);
    // });
  }
}
