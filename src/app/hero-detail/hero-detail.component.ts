
import { Hero } from '../data/hero';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../services/hero.service';
import {Weapon} from "../data/weapon";
import {WeaponService} from "../services/weapon.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;
  weapons: Weapon;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private weaponService: WeaponService,
  ) {}

  ngOnInit(): void {
    this.initHero();
  }

  initHero(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  validation(atq, dodge, dmg, hp): void {
    if ((atq + dodge + dmg + hp) === 40) {
      (document.getElementById('btSave') as HTMLInputElement).disabled = false;
    } else {
      (document.getElementById('btSave') as HTMLInputElement).disabled = true;
    }
  }

  validateNumber(element): string {
    if (element >= 1 && (element <= 37)) {
      if (this.getPointsRestants() === 0) {
        return 'green';
      } else {
        return 'red';
      }
    } else {
      return 'red';
    }
  }

  getPointsRestants() {
    return (40 - (this.hero.attack + this.hero.dodge + this.hero.dmg + this.hero.hp));
  }

  save() {
    const total = this.getPointsRestants();
    if (total === 0) {
      this.heroService.updateHero(this.hero);
      this.location.back();
    }
  }

}
