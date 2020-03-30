import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import {WeaponsComponent} from './weapons/weapons.component';
import {WeaponDetailComponent} from "./weapon-detail/weapon-detail.component";
import {NewHeroComponent} from "./new-hero/new-hero.component";
import {NewWeaponComponent} from "./new-weapon/new-weapon.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'weapons', component: WeaponsComponent },
  { path: 'detailWeapon/:id', component: WeaponDetailComponent },
  { path: 'newHero', component: NewHeroComponent },
  { path: 'newWeapon', component: NewWeaponComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
