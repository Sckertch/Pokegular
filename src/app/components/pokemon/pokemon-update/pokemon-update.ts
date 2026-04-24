import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../../core/api/pokemon';
import { Pokemon } from '../../../core/models/pokemon';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pokemon-update',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './pokemon-update.html',
  styleUrl: './pokemon-update.scss',
})
export class PokemonUpdate {
  private readonly pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  pokemon = signal<Pokemon | null>(null);

  pokeFormUpdate = this.formBuilder.group({
    name: ['', Validators.required],
    image: ['', Validators.required],
    description: ['', Validators.required],
  });
  private id: string ='';

  findById(id: string) {
    this.pokemonService.getById(id).subscribe({
      next: (pokemon) => {
        this.pokemon.set(pokemon.data);
        console.log('INFO', pokemon.data);
      },
      error: () => console.error('Error getting pokemon'),
    });
  }

  onSubmit() {
    const payload = this.pokeFormUpdate.value as {
      name: string;
      image: string;
      description: string;
    };
    console.log(payload);
    this.pokemonService.update(this.id, payload).subscribe({
      next: () => this.router.navigate(['/pokemon']),
      error: () => console.error('Error updating pokemon'),
    });
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID : ', this.id);
    if (id) {
      this.id= id;
      this.findById(this.id);
    }
  }
}
