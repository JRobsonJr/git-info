import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarProjetoComponent } from './registrar-projeto/registrar-projeto.component';
import { ListarProjetosComponent } from './listar-projetos/listar-projetos.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'registrar', component: RegistrarProjetoComponent },
  { path: 'projetos', component: ListarProjetosComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
