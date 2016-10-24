import { Injectable } from '@angular/core';
import { Record } from 'js-data';

import DataStore from '../services/store';
import { HttpService } from '../services';
import { AbscractModel } from './abstract';


// CHANGE the following desiganted names and values for each new model service


// this ts interface is not currently being used in this file
// it's primarily for use elsewhere--this seems like a good place to declare it

export interface User {                     // CHANGE interface name, if used
  id: string;
  first_name: string;
  last_name: string;
  preferred_name: string;
  email: string;
  phone: string;
  gender: string;
  birthdate: Date;
  image: string;
  last_login: Date;
  date_joined: Date;
  is_developer: boolean;
}

let model = class User extends Record {};   // CHANGE class name
let name: string = 'User';                  // CHANGE mapper name
let endpoint: string = 'users';             // CHANGE api endpoint

@Injectable()
export class UserModel extends AbscractModel { // CHANGE service name
  constructor (public http: HttpService) { super(name, endpoint, http); }
}

DataStore.defineMapper(name, {              // ADD relations or methods as necessary
  endpoint: endpoint,
  recordClass: model,
  // relations: {}
});
