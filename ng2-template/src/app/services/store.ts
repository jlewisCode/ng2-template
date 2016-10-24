import { DataStore } from 'js-data';

// this is the construction for the app-wide js-data store. this is the only
// place this construction should happen, and every reference to the store
// should be to this instance

const store = new DataStore();

export default store;
