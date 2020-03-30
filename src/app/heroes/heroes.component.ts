import { Component, OnInit } from '@angular/core';
import { Hero } from '../data/hero';
import {HeroService} from '../services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  filterbyName() {
    this.heroes.sort((a, b) => a.name.localeCompare(b.name));
  }
  filterbyProperty(property: string) {
    this.heroes.sort((a, b) => { return b[property] - a[property] });
  }
}
