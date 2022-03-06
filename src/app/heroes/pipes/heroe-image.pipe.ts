import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';
import { HttpClient } from '@angular/common/http';

@Pipe({
  name: 'heroeImage',
  //solo se hace cuando es estrictamente necesario
  //para que se procese el obj cada vez que se detecta
  //cualquier cambio
  pure: false 
})
export class HeroeImagePipe implements PipeTransform {

  constructor(
    private http: HttpClient
  ) { }

  transform(heroe: Heroe): string {

    if ( !heroe.id && !heroe.alt_img) {
      return './assets/no-image.png';
    } else if(heroe.alt_img) {
      return heroe.alt_img;
    } else {
      const path: string = `./assets/heroes/${ heroe.id }.jpg`
      return path;
    }
  }

}
