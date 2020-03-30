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
  filterType: boolean;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  filterbyName() {
    if (this.filterType) {
      this.heroes.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.heroes.sort((a, b) => b.name.localeCompare(a.name));
    }
    this.filterType = !this.filterType;
  }
  filterbyProperty(property: string) {
    if (this.filterType) {
      this.heroes.sort((a, b) => {return a[property] - b[property]});
    } else {
      this.heroes.sort((a, b) => {return b[property] - a[property]});
    }
    this.filterType = !this.filterType;
  }
}
