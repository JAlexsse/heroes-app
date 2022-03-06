import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { AddHeroeComponent } from './pages/add-heroe/add-heroe.component';
import { ListHeroesComponent } from './pages/list-heroes/list-heroes.component';
import { HeroeCardComponent } from './components/heroe-card/heroe-card.component';
import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroeImagePipe } from './pipes/heroe-image.pipe';
import { HomeHeroeComponent } from './pages/home-heroe/home-heroe.component';
import { SearchHeroeComponent } from './pages/search-heroe/search-heroe.component';
import { ViewHeroeComponent } from './pages/view-heroe/view-heroe.component';
import { ConfirmComponent } from './components/confirm/confirm.component';

@NgModule({
  declarations: [
    AddHeroeComponent,
    ListHeroesComponent,
    HomeHeroeComponent,
    HeroeCardComponent,
    HeroeImagePipe,
    SearchHeroeComponent,
    ViewHeroeComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    HeroesRoutingModule,
    MaterialModule
  ]
})
export class HeroesModule { }
