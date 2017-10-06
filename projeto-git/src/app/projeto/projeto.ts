export class Projeto {
    nome: string;
    url: string;
    commits: number;
  
    constructor(nome?: string, url?: string) {
      this.nome = nome;
      this.url = url;
    }
  
    ngOnInit() {
    }
  
    toString() {
      return 'Projeto ' + this.nome + ' disponível em: ' + this.url + ' com ' + this.commits + ' commits.';
    }
  }