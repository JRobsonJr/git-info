import { ProjetoService } from './projeto/projeto.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegistrarProjetoComponent } from './registrar-projeto/registrar-projeto.component';
import { ListarProjetosComponent } from './listar-projetos/listar-projetos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrarProjetoComponent,
    ListarProjetosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProjetoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
