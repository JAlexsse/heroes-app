import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-view-heroe',
  templateUrl: './view-heroe.component.html',
  styles: [
  ]
})
export class ViewHeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(
          ({ id }) => this.heroesService.getHeroe( id )
        )
      )
      .subscribe(
        heroe => this.heroe = heroe
      );

    /* this.activatedRoute.params.subscribe(
      params => {
        this.heroesService
          .getHeroe(params['id'])
          .subscribe( heroe => {
            this.heroe = heroe;
          } )
      }
    ) */
  }

  backToList() {
    this.router.navigate(['/heroes/list']);
  }

}
