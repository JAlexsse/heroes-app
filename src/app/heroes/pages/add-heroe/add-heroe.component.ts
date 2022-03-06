import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { of, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-add-heroe',
  templateUrl: './add-heroe.component.html',
  styles: [
  ]
})
export class AddHeroeComponent implements OnInit {

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    publisher: Publisher.DCComics,
    first_appearance: ''
  }
  
  publishers = [
    {
      id: 'Marvel Comics',
      description: 'Marvel - Comics'
    },
    {
      id: 'DC Comics',
      description: 'DC - Comics'
    }
  ]

  durationSnackBar = 5;

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {

    if ( !this.router.url.includes('edit') ) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(
          ({ id }) => 
          this.heroesService.getHeroe( id )
        )
      )
      .subscribe(heroe => this.heroe = heroe);

  }

  saveHeroe() {

    if( this.heroe.superhero.trim().length === 0) {
      return;
    }

    if( !this.heroe.id ) {
      //post new heroe
      this.heroesService.postHeroe(this.heroe)
        .subscribe( 
          response => this.openSnackBar('Heroe successfully created.')
        )
    } else {
      //update heroe
      this.heroesService.putHeroe(this.heroe)
        .subscribe( 
          heroe => {
            this.router.navigate(['/heroes/edit', heroe.id]);
            this.openSnackBar('Heroe successfully updated.');
          }
        )
    }

  }

  deleteHeroe() {
    const dialog = this.dialog.open( ConfirmComponent, {
      width: '30%',
      data: this.heroe
    } );

    dialog.afterClosed().pipe(
      switchMap(
        ( response ) => response ? this.heroesService.deleteHeroe( this.heroe.id! ) : of(false)
      )
    )
    .subscribe(
      response => {
        this.router.navigate(['heroes']);
                this.openSnackBar('Heroe successfully deleted.');
      }
    )
    
    //se resuelve con switchMap por que es un subscribe dentro de otro
    /*
    dialog.afterClosed().subscribe(
      ( result ) => {
        if ( result ) {
          this.heroesService.deleteHeroe( this.heroe.id! )
            .subscribe(
              response => {
                this.router.navigate(['heroes']);
                this.openSnackBar('Heroe successfully deleted.');
              }
            ) 
        }
      }
    )
    */
  }

  openSnackBar( message: string ) {
    this.snackBar.open( message, 'OK', {
      duration: this.durationSnackBar * 1000
    });
  }

}
