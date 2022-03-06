import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home-heroe',
  templateUrl: './home-heroe.component.html',
  styles: [
  ]
})
export class HomeHeroeComponent implements OnInit {

  get auth() {
    return this.authServices.auth;
  }

  constructor(
    private router: Router,
    private authServices: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.router.navigate(['auth']);
  }

}
