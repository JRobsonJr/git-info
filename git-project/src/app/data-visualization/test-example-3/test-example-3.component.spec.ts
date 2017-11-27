import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestExample3Component } from './test-example-3.component';

describe('TestExample3Component', () => {
  let component: TestExample3Component;
  let fixture: ComponentFixture<TestExample3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestExample3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestExample3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
