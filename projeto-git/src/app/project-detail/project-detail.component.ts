import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Rx';
import { Project } from '../project/project.model';
import { ProjectDataService } from './../project/project-data.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {

  id: number;
  subscription: Subscription;
  project: Project;

  constructor(private route: ActivatedRoute, private router: Router, private projectService: ProjectDataService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        this.project = this.projectService.getProject(this.id);

        if (this.project == null) {
          this.router.navigate(['/notFound']);
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
