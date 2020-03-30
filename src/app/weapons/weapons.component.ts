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
  filterType: boolean;

  constructor(private weaponService: WeaponService) { }

  ngOnInit() {
    this.getWeapons();
  }

  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }

  filterbyName() {
    if (this.filterType) {
      this.weapons.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.weapons.sort((a, b) => b.name.localeCompare(a.name));
    }
    this.filterType = !this.filterType;
  }
  filterbyProperty(property: string) {
    if (this.filterType) {
      this.weapons.sort((a, b) => {return a[property] - b[property]});
    } else {
      this.weapons.sort((a, b) => {return b[property] - a[property]});
    }
    this.filterType = !this.filterType;
  }
}
