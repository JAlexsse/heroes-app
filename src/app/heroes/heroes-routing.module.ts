import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListHeroesComponent } from './pages/list-heroes/list-heroes.component';
import { AddHeroeComponent } from './pages/add-heroe/add-heroe.component';
import { SearchHeroeComponent } from './pages/search-heroe/search-heroe.component';
import { ViewHeroeComponent } from './pages/view-heroe/view-heroe.component';
import { HomeHeroeComponent } from './pages/home-heroe/home-heroe.component';

const routes: Routes = [
  {
    path: '',
    component: HomeHeroeComponent,
    children: [
      {
        path: 'list',
        component: ListHeroesComponent
      },
      {
        path: 'add',
        component: AddHeroeComponent
      },
      {
        path: 'edit/:id',
        component: AddHeroeComponent
      },
      {
        path: 'search',
        component: SearchHeroeComponent
      },
      {
        path: ':id',
        component: ViewHeroeComponent
      },
      {
        path: '**',
        redirectTo: 'list'
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class HeroesRoutingModule { }
