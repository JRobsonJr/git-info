import { Component, OnInit } from '@angular/core';

import { Projeto } from './../projeto/projeto';
import { ProjetoService } from './../projeto/projeto.service';

@Component({
  selector: 'app-listar-projetos',
  templateUrl: './listar-projetos.component.html',
  styleUrls: ['./listar-projetos.component.css']
})
export class ListarProjetosComponent implements OnInit {
  
  projetos: Projeto[] = [];

  constructor(private projetoService: ProjetoService) {
  }

  ngOnInit() {
    this.projetos = this.projetoService.getProjetos();
  }

}
