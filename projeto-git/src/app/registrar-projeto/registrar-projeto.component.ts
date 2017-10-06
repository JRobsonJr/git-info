import { Component, OnInit } from '@angular/core';

import { Projeto } from './../projeto/projeto';
import { ProjetoService } from './../projeto/projeto.service';

@Component({
  selector: 'app-registrar-projeto',
  templateUrl: './registrar-projeto.component.html',
  styleUrls: ['./registrar-projeto.component.css']
})
export class RegistrarProjetoComponent implements OnInit {

  projetos: Projeto[] = [];
  projetoAtual: Projeto = new Projeto();

  constructor(private projetoService: ProjetoService) {
  }

  ngOnInit() {
    this.projetos = this.projetoService.getProjetos();
  }

  onSubmit() {
    this.projetoService.addProjeto(this.projetoAtual);
  }
}
