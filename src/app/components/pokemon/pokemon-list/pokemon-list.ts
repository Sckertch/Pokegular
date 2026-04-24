import { Component, inject, OnInit, signal } from '@angular/core';
import { PokemonService } from '../../../core/api/pokemon';
import { Pokemon } from '../../../core/models/pokemon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss',
  imports: [RouterLink],
})
export class PokemonList implements OnInit {
  private readonly pokemonService = inject(PokemonService);

  pokemons = signal<Pokemon[]>([]);

  loadPokemon(): void {
    this.pokemonService.getAll().subscribe({
      next: (pokemons) => {
        this.pokemons.set(pokemons.data);
        console.log(pokemons.data);
      },
      error: () => console.error('Error getting pokemon list'),
    });
  }

  ngOnInit(): void {
    this.loadPokemon();
  }
}
