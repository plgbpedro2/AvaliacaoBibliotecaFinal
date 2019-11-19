import { Component, OnInit, TemplateRef } from '@angular/core';
import { LivroService } from '../_services/livro.service';
import { Livro } from '../_models/Livro';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup,  Validators, FormBuilder } from '@angular/forms';
import { defineLocale, BsLocaleService, ptBrLocale} from 'ngx-bootstrap';
defineLocale ('pt-br', ptBrLocale);


@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent implements OnInit {

  livrosFiltrados: Livro[];
  livros: Livro[];
  livro: Livro;
  modalRef: BsModalRef;
  registerForm: FormGroup;
  modoSalvar: string;
  bodyDeletarLivro = '';

  constructor(
    private livroService: LivroService
  , private modalService: BsModalService
  , private fb: FormBuilder
  , private localeService: BsLocaleService
    ) {
      this.localeService.use('pt-br');
     }

  ngOnInit() {
    this.validation();
    this.getLivros();
  }

  openModal( template: any) {
    this.registerForm.reset();
    template.show();
  }

  validation() {
    this.registerForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      editora: ['', Validators.required],
      autor: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      edicao: ['', Validators.required],
      tema: ['', Validators.required]
    });
  }

  // adiciona um livro
  salvarAlteracao( template: any) {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {
        this.livro = Object.assign({}, this.registerForm.value);
        this.livroService.postLivro(this.livro).subscribe(
          (novoLivro: Livro) => {
            console.log(novoLivro);
            template.hide();
            this.getLivros();
          }, error => {
            console.log(error);
          }
        );
      } else {
        this.livro = Object.assign({id: this.livro.id}, this.registerForm.value);
        this.livroService.putLivro(this.livro).subscribe(
          () => {
            template.hide();
            this.getLivros();
          }, error => {
            console.log(error);
          }
        );
        // console.log(this.livro);
      }
    }
  }

  // edita um livro
  editarLivro(livro: Livro, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.livro = livro;
    this.registerForm.patchValue(livro);
  }

  // edita um livro
  novoLivro(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  // exclui livro
  excluirLivro(livro: Livro, template: any) {
    this.openModal(template);
    this.livro = livro;
    this.bodyDeletarLivro = `Tem certeza que quer excluir o livro ${livro.titulo} ?`;
  }

  // confirma exclusao
  confirmeDelete(template: any) {
    this.livroService.deleteLivro(this.livro.id).subscribe(
      () => {
        template.hide();
        this.getLivros();
      }, error => {
        console.log(error);
      }
    );
  }

  // funcao get vai fazer o request para carregar os livros da api
  getLivros() {
    this.livroService.getAllLivro().subscribe(
    // tslint:disable-next-line: variable-name
    (_livros: Livro[]) => {
      this.livros = _livros;
      console.log(_livros);
    }, error => {
      console.log(error);
    }

    );
  }
}
