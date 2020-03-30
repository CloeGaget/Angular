import { Component, OnInit } from '@angular/core';
import { Weapon } from '../data/weapon';
import {WeaponService} from '../services/weapon.service';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})

export class WeaponsComponent implements OnInit {
  weapons: Weapon[];

  constructor(private weaponService: WeaponService) { }

  ngOnInit() {
    this.getWeapons();
  }

  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }

  filterbyName() {
    this.weapons.sort((a, b) => a.name.localeCompare(b.name));
  }

  filterbyProperty(property: string) {
    this.weapons.sort((a, b) => { return b[property] - a[property] });
  }
}
