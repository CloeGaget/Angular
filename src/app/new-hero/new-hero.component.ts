import { Component, OnInit } from '@angular/core';
import {Hero} from "../data/hero";
import {Weapon} from "../data/weapon";
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../services/hero.service";
import {Location} from "@angular/common";
import {WeaponService} from "../services/weapon.service";

@Component({
  selector: 'app-new-hero',
  templateUrl: './new-hero.component.html',
  styleUrls: ['./new-hero.component.css']
})
export class NewHeroComponent implements OnInit {

  hero: Hero;
  weapons: Weapon[];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private weaponService: WeaponService,
  ) {}

  ngOnInit() {
    this.getWeapons();
    this.initHero();
  }

  initHero(): void {
    this.hero = new Hero();
    this.hero.weaponId = '0';
    this.hero.attack = 1;
    this.hero.dodge = 1;
    this.hero.hp = 1;
    this.hero.dmg = 1;
  }

  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }

  validation(atq, dodge, dmg, hp): void {
    if ((atq + dodge + dmg + hp) <= 40) {
      (document.getElementById('btSave') as HTMLInputElement).disabled = false;
    } else {
      (document.getElementById('btSave') as HTMLInputElement).disabled = true;
    }
  }

  validateNumber(element): string {
    if (element >= 1 && (element <= 37)) {
      if (this.getPointsRestants() >= 0) {
        return 'green';
      } else {
        return 'red';
      }
    } else {
      return 'red';
    }
  }

  getPointsRestants() {
    const ptRest = (this.hero.attack + this.hero.dodge + this.hero.dmg + this.hero.hp);
    if (!ptRest) {
      return 40;
    } else {
      return (40 - ptRest);
    }

  }

  save() {
    const total = this.getPointsRestants();
    if (total >= 0) {
      this.heroService.addHero(this.hero);
      this.location.back();
    }
  }

  goBack(): void {
    this.location.back();
  }


}
