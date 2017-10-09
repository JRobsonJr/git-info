import { Component, OnInit } from '@angular/core';

import { Project } from './../project/project.model';
import { ProjectDataService } from './../project/project-data.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: Project[] = [];

  constructor(private projectService: ProjectDataService) {
  }

  ngOnInit() {
    this.projects = this.projectService.getProjects();
  }

}
