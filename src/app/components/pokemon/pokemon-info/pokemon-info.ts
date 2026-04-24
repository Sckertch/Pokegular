import { Component, inject, signal } from '@angular/core';
import { Pokemon } from '../../../core/models/pokemon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../../core/api/pokemon';

@Component({
  selector: 'app-pokemon-info',
  imports: [RouterLink],
  templateUrl: './pokemon-info.html',
  styleUrl: './pokemon-info.scss',
})
export class PokemonInfo {
  private readonly pokemonService = inject(PokemonService);

  private route = inject(ActivatedRoute);

  pokemon = signal<Pokemon | null>(null);

  findById(id: string) {
    this.pokemonService.getById(id).subscribe({
      next: (pokemon) => {
        this.pokemon.set(pokemon.data);
        console.log('INFO', pokemon.data);
      },
      error: () => console.error('Error getting pokemon'),
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID : ', id);
    if (id) {
      this.findById(id);
    }
  }
}
