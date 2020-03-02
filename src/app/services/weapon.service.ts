import { Injectable } from '@angular/core';
import {MessageService} from "./message.service";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Weapon} from "../data/weapon";

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  private static url = 'weapons';

  constructor(private messageService: MessageService,
              private db: AngularFirestore) { }

  /*getWeapons(): Observable<Weapon[]> {
    this.messageService.add('WeaponService: fetched weapons');
    return this.db.collection<Weapon>('weapons').valueChanges();
  }*/

  // Récupération des armes
  getWeapons(): Observable<Weapon[]> {

    //
    return this.db.collection<Weapon>(WeaponService.url)
      .snapshotChanges()
      .pipe(
        map(liste => {

          // log
          console.log('getWeapon()');

          // Traitement de la liste
          return liste.map(item => {

            // Get document data
            const data = item.payload.doc.data();

            // New Hero
            const weapon = new Weapon().fromJSON(data);

            // Get document id
            const id = item.payload.doc.id;
            weapon.id = id;

            // log
            console.log('   weapon ' + id);

            // Use spread operator to add the id to the document data
            return weapon;

          });
        })
      );
  }

  // Récupération d'un héro en fonction de son id
  getWeapon(id: string): Observable<Weapon> {

    // Return hero observable
    return this.getWeaponDocument(id).snapshotChanges()
      .pipe(
        map(item => {

          // Get document data
          const data = item.payload.data();

          // New Weapon
          const weapon = new Weapon().fromJSON(data);
          weapon.id = id;

          // log
          console.log('getWeapon(' + id + ')');

          // Use spread operator to add the id to the document data
          return weapon;
        })
      );
  }

  // Ajout d'une arme
  addWeapon(weapon: Weapon) {
    this.db.collection<Weapon>(WeaponService.url).add(Object.assign({}, weapon));
  }

  // Modification d'une arme
  updateWeapon(weapon: Weapon) {

    // Update document
    this.getWeaponDocument(weapon.id).update(Object.assign({}, weapon));
  }

  // Suppression d'une arme
  deleteWeapon(id: string) {

    // Delete the document
    this.getWeaponDocument(id).delete();
  }


  // Création du service Firebase en fonction de l'id du héro
  private getWeaponDocument(id: string): AngularFirestoreDocument<Weapon> {

    // return document
    return this.db.doc<Weapon>(WeaponService.url + `/` + id);
  }
}
