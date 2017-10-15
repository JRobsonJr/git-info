import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNotFoundComponent } from './project-not-found.component';

describe('ProjectNotFoundComponent', () => {
  let component: ProjectNotFoundComponent;
  let fixture: ComponentFixture<ProjectNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
