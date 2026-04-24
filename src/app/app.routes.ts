import { Routes } from '@angular/router';
import { PokemonList } from './components/pokemon/pokemon-list/pokemon-list';
import { PokemonInfo } from './components/pokemon/pokemon-info/pokemon-info';
import { PokemonUpdate } from './components/pokemon/pokemon-update/pokemon-update';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokemon',
    pathMatch: 'full',
  },
  {
    path: 'pokemon',
    component: PokemonList,
  },
  {
    path: 'pokemon/:id',
    component: PokemonInfo,
  },
  {
    path: 'pokemon/:id/edit',
    component: PokemonUpdate,
  },
];
