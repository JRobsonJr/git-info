import { ProjectDataService } from './../project/project-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';

import { Author } from '../shared/commit-data';

@Component({
  selector: 'app-contributor-detail',
  templateUrl: './contributor-detail.component.html',
  styleUrls: ['./contributor-detail.component.css']
})
export class ContributorDetailComponent implements OnInit {

  private projectId: number;
  contributor: Author;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private projectService: ProjectDataService) {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.projectId = params['id'];
        let contributorEmail = params['email'];
        this.projectService.getContributor(this.projectId, contributorEmail).subscribe(resp => {
          this.contributor = resp;
        });

        if (this.contributor === null) {
          this.router.navigate(['/notFound']);
        }
      }
    );
  }

  ngOnInit() {
  }

}
