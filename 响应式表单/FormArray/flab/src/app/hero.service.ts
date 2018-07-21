import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Hero} from './hero';
import {heroes} from './data-model';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  delayMs = 500;

  // Fake server get; assume nothing can go wrong
  getHeroes(): Observable<Hero[]> {
    return of(heroes).pipe(delay(this.delayMs)); // simulate latency with delay
  }

  // Fake server update; assume nothing can go wrong
  updateHero(hero: Hero): Observable<Hero> {
    const oldHero = heroes.find(h => h.id === hero.id);
    const newHero = Object.assign(oldHero, hero); // Demo: mutate cached hero
    return of(newHero).pipe(delay(this.delayMs)); // simulate latency with delay
  }
}
