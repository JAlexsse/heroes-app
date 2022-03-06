import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private api: string = `${ environment.apiUrl }/heroes`;
  
  constructor(
    private http: HttpClient
  ) { }

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${ this.api }`);
  }

  getHeroe( id: string ): Observable<Heroe> {
    return this.http.get<Heroe>(`${ this.api }/${ id }`);
  }

  getSuggestions( query: string ): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${ this.api }?q=${ query }&_limit=5`)
  }

  postHeroe( heroe: Heroe ): Observable<Heroe> {
    return this.http.post<Heroe>(`${ this.api }`, heroe);
  }

  putHeroe( heroe: Heroe ): Observable<Heroe> {
    return this.http.put<Heroe>(`${ this.api }/${ heroe.id }`, heroe);
  }

  deleteHeroe( id: string ): Observable<any> {
    return this.http.delete<any>(`${ this.api }/${ id }`)
  }
}
