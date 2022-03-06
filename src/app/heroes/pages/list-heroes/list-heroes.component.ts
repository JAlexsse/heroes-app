import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-list-heroes',
  templateUrl: './list-heroes.component.html',
  styles: [
  ]
})
export class ListHeroesComponent implements OnInit {

  heroes: Heroe[] = [];
  constructor(
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {

    this.heroesService
      .getHeroes()
      .subscribe( heroes => 
        this.heroes = heroes
        );

  }

}
