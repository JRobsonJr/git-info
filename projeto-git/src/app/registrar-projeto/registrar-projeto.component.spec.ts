import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarProjetoComponent } from './registrar-projeto.component';

describe('RegistrarProjetoComponent', () => {
  let component: RegistrarProjetoComponent;
  let fixture: ComponentFixture<RegistrarProjetoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarProjetoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
