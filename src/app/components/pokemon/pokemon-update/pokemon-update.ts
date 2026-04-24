import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../../core/api/pokemon';
import { Pokemon } from '../../../core/models/pokemon';
import { PokemonType } from '../../../core/models/pokemonType';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PokemonTypeService } from '../../../core/api/pokemonType';

@Component({
  selector: 'app-pokemon-update',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './pokemon-update.html',
  styleUrl: './pokemon-update.scss',
})
export class PokemonUpdate {
  private readonly pokemonService = inject(PokemonService);
  private readonly pokemonTypeService = inject(PokemonTypeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  pokemon = signal<Pokemon | null>(null);
  types = signal<PokemonType[]>([]);

  pokeFormUpdate = this.formBuilder.group({
    name: ['', Validators.required],
    image: ['', Validators.required],
    description: ['', Validators.required],
    type1: ['', Validators.required],
    type2: ['', Validators.required]
  });

  private id: string = '';

  findById(id: string) {
    this.pokemonService.getById(id).subscribe({
      next: (pokemon) => {
        this.pokemon.set(pokemon.data);
        console.log('INFO', pokemon.data);
      },
      error: () => console.error('Error getting pokemon'),
    });
  }

  loadType(): void {
    this.pokemonTypeService.getAll().subscribe({
      next: (type) => {
        this.types.set(type.data);
        console.log(type.data);
      },
      error: () => console.error('Error getting pokemon list'),
    });
  }

  updateDescription(event: any) {
    const newDescription = event.target.innerText;
    this.pokeFormUpdate.patchValue({ description: newDescription });
  }

  onSubmit() {
    const payload = this.pokeFormUpdate.value as {
      name: string;
      image: string;
      description: string;
      types: string[];
    };
    console.log('payload', payload);
    this.pokemonService.update(this.id, payload).subscribe({
      next: () => this.router.navigate(['/pokemon']),
      error: () => console.error('Error updating pokemon'),
    });
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
      this.loadType();
      this.findById(this.id);
      console.log(this.types);
    }
  }
}
