import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../../core/api/pokemon';
import { Pokemon, PokemonPayload } from '../../../core/models/pokemon';
import { PokemonType } from '../../../core/models/pokemonType';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PokemonTypeService } from '../../../core/api/pokemonType';
import { forkJoin, isEmpty } from 'rxjs';

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
  isLoaded = signal<boolean>(false);

  range = Array.from({ length: 2 }, (_, i) => i);

  pokeFormUpdate !: FormGroup;

  private id: string = '';

  get typesArray() {
    return this.pokeFormUpdate.get('types') as FormArray;
  }

  onSubmit() {
    const payload: Partial<{
      name: string;
      image: string;
      description: string;
      types: string[];
    }> = {};

    // Champs simples : ne garder que les dirty
    ['name', 'image', 'description'].forEach((key) => {
      const control = this.pokeFormUpdate.get(key);
      if (control?.dirty) {
        payload[key as keyof PokemonPayload] = control.value;
      }
    });

    if (this.typesArray.dirty) {
      const currentTypes = this.typesArray.value as string[];

      // On fusionne : valeur du form si modifiée, sinon valeur originale du pokémon
      payload.types = currentTypes
        .map((val, i) => {
          const isDirty = this.typesArray.at(i).dirty;
          const original = this.pokemon()?.types?.[i]?.name ?? '';
          return isDirty ? val : original;
        })
        .filter((t) => t !== ''); // retire le type2 si vide (optionnel non rempli)
    }
    console.log(payload);

    this.pokemonService.update(this.id, payload).subscribe({
      next: () => this.router.navigate(['/pokemon']),
      error: () => console.error('Error updating pokemon'),
    });
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;

      forkJoin({
        pokemon: this.pokemonService.getById(id),
        types: this.pokemonTypeService.getAll(),
      }).subscribe({
        next: ({ pokemon, types }) => {
          this.pokemon.set(pokemon.data);
          this.types.set(types.data);
          this.pokeFormUpdate = this.formBuilder.group({
            name: [pokemon.data.name, Validators.required],
            image: [pokemon.data.image, Validators.required],
            description: [pokemon.data.description, Validators.required],
            types: this.formBuilder.array([
              this.formBuilder.control('', Validators.required),
              this.formBuilder.control(''),
            ]),
          });console.log('pokemon : ', pokemon.data);
          console.log('types : ', types.data);
          this.isLoaded.set(true); // ✅ passe à true quand les deux sont remplis
        },
        error: () => console.error('Erreur lors du chargement'),
      });
    }
  }

  protected readonly isEmpty = isEmpty;
}
