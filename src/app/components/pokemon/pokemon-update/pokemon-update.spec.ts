import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonUpdate } from './pokemon-update';

describe('PokemonUpdate', () => {
  let component: PokemonUpdate;
  let fixture: ComponentFixture<PokemonUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonUpdate],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
