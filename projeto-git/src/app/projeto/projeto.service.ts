import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Projeto } from './projeto';

@Injectable()
export class ProjetoService implements OnInit {

  // static criouNovoProjeto = new EventEmitter<Projeto>();

  ngOnInit() {}

  private projetos: Projeto[] = [];
  
  addProjeto(projeto: Projeto) {
    this.projetos.push(projeto);
  }

  getProjetos() {
    return this.projetos;
  }
}
