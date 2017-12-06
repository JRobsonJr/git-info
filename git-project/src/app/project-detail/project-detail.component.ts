import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Rx';
import { Project } from '../project/project.model';
import { ProjectDataService } from './../project/project-data.service';
import { Commit } from './../shared/commit-data';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {

  id: number;
  subscription: Subscription;
  project: Project;
  commits: Array<Commit>;

  constructor(private route: ActivatedRoute, private router: Router, private projectService: ProjectDataService) {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        this.project = this.projectService.getProject(this.id);
        this.projectService.getCommits(this.id).subscribe(resp => {
          this.commits = resp;
        });
        this.projectService.getContributors(this.id).subscribe(resp => {
          this.project.contributors = resp;
        });

        if (this.project == null) {
          this.router.navigate(['/notFound']);
        }
      }
    );
  }

  getCommitFrequency(): any {
    this.projectService.getCommitFrequency(this.id).subscribe(resp => {
      this.project.commitFrequency = resp;
      return resp;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
