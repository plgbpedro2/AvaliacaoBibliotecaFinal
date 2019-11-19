import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from '../_models/Livro';


@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseUrl = 'http://localhost:5000/api/livro';


  constructor(private http: HttpClient) { }

  getAllLivro(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.baseUrl);
  }

  getLivroById(id: number): Observable<Livro> {
    return this.http.get<Livro>(`${this.baseUrl}/${id}`);
  }

  postLivro( livro: Livro) {
    return this.http.post(this.baseUrl, livro);
  }

  putLivro( livro: Livro) {
    return this.http.put(`${this.baseUrl}/${livro.id}`, livro);
  }

  deleteLivro(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
