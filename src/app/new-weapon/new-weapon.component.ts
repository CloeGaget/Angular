import { Component, OnInit } from '@angular/core';
import {Weapon} from "../data/weapon";
import {ActivatedRoute} from "@angular/router";
import {WeaponService} from "../services/weapon.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-new-weapon',
  templateUrl: './new-weapon.component.html',
  styleUrls: ['./new-weapon.component.css']
})
export class NewWeaponComponent implements OnInit {

  weapon: Weapon;

  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService,
    private location: Location
  ) {}

  ngOnInit() {
    this.initWeapon();
  }

  initWeapon(): void {
    this.weapon = new Weapon();
    this.weapon.attack = 0;
    this.weapon.dodge = 0;
    this.weapon.hp = 0;
    this.weapon.dmg = 0;
  }

  goBack(): void {
    this.location.back();
  }

  validation(atq, dodge, dmg, hp): void {
    if ((atq + dodge + dmg + hp) === 0) {
      (document.getElementById('btSave') as HTMLInputElement).disabled = false;
    } else {
      (document.getElementById('btSave') as HTMLInputElement).disabled = true;
    }
  }

  validateNumber(element): string {
    if (element >= -5 && (element <= 5)) {
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
    return (0 - (this.weapon.attack + this.weapon.dodge + this.weapon.dmg + this.weapon.hp));
  }

  save() {
    const total = this.getPointsRestants();
    if (total === 0) {
      this.weaponService.addWeapon(this.weapon);
      this.location.back();
    }
  }
}
