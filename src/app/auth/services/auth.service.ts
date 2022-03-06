import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable, of, tap } from 'rxjs';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api: string = `${ environment.apiUrl }/usuarios`;
  private _auth: Auth | undefined;

  get auth():Auth {
    return { ...this._auth! } //se desestructura para que no se cambie accidentalmente
  }

  constructor(
    private http: HttpClient
  ) { }

  checkAuth(): Observable<boolean>{

    if (!localStorage.getItem('token') ) {
      return of(false);
    }

    return this.http.get<Auth>(`${ this.api }/1`)
      .pipe( 
        map( auth => {
          this._auth = auth;
          return true;
        }) //transforma el resultado
      )
  }

  login(): Observable<Auth>{
    return this.http.get<Auth>(`${ this.api }/1`)
      .pipe( //se hace un pipe para no destruir el subscribe del componente de login
        tap( response => this._auth = response ),
        tap( auth => localStorage.setItem('token', auth.id) )
      )
  }

  logout() {
    this._auth = undefined;
  }
}
