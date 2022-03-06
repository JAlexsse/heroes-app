import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-heroe',
  templateUrl: './search-heroe.component.html',
  styles: [
  ]
})
export class SearchHeroeComponent implements OnInit {

  query: string = '';
  heroes: Heroe[] = [];
  selectedHeroe: Heroe | undefined;

  constructor(
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
  }

  searching() {
    this.heroesService.getSuggestions( this.query.trim() )
      .subscribe(
        heroes => this.heroes = heroes
      )
  }

  selectedSuggestion( event: MatAutocompleteSelectedEvent ) {
    
    if(event.option.value){
      const heroe: Heroe = event.option.value;
      this.query = heroe.superhero;
  
      this.heroesService
        .getHeroe( heroe.id! )
        .subscribe(
          h => this.selectedHeroe = h
        )
    } else {
      this.selectedHeroe = undefined;
    }
  }

}
