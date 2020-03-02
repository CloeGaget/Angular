import {Serializable} from './serializable';

export class Hero extends Serializable  {
  id: string;
  name: string;
  attack: number;
  dodge: number;
  dmg: number;
  hp: number;
  weapon: string;
}
