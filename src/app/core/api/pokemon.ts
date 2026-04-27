import { inject, Injectable } from '@angular/core';
import { Pokemon, PokemonPayload } from '../models/pokemon';
import { env } from '../../environnement/environnement.dev';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/apiResponse';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly baseUrl = `${env.apiUrl}/pokemon`;
  private http = inject(HttpClient);

  getAll(): Observable<ApiResponse<Pokemon[]>> {
    return this.http.get<ApiResponse<Pokemon[]>>(this.baseUrl);
  }

  getById(id: string): Observable<ApiResponse<Pokemon>> {
    console.log(this.baseUrl + '/' + id);
    return this.http.get<ApiResponse<Pokemon>>(this.baseUrl + '/' + id);
  }

  update(id: string, payload: Partial<PokemonPayload>){
    return this.http.patch<ApiResponse<Pokemon>>(this.baseUrl + '/' + id, payload);
  }
}
