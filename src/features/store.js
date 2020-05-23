// We need to import the store from models, and models
// from the file we create the store, which would create
// a circular dependency. To avoid this, separate the store
// instance and the store creator function
//
// model[].js -> createStore.js -> App.js <- store
// model[].js <- store

let store;

export const saveStore = s => { store = s; }

export default store;