import { inject, Injectable } from '@angular/core';
import { env } from '../../environnement/environnement.dev';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/apiResponse';
import { PokemonType } from '../models/pokemonType';

@Injectable({
  providedIn: 'root',
})
export class PokemonTypeService {
  private readonly baseUrl = `${env.apiUrl}/type`;
  private http = inject(HttpClient);

  getAll(): Observable<ApiResponse<PokemonType[]>> {
    return this.http.get<ApiResponse<PokemonType[]>>(this.baseUrl);
  }

  getById(id: string): Observable<ApiResponse<PokemonType>> {
    console.log(this.baseUrl + '/' + id);
    return this.http.get<ApiResponse<PokemonType>>(this.baseUrl + '/' + id);
  }

}
