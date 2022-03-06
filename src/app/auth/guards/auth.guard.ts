import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    return this.authService.checkAuth()
      .pipe(
        tap( status => {
          if ( !status ) {
            this.router.navigate(['auth/login'])
          }
        }) 
      );
  }

  //solo restringe que se pueda pueda cargar el modulo
  //si el modulo ya esta cargado, no puede hacer nada
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    
    return this.authService.checkAuth()
    .pipe(
      tap( status => {
        if ( !status ) {
          this.router.navigate(['auth/login'])
        }
      }) 
    );
    
  }
}
