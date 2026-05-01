import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class Data {

  clickedMovie: any;
  clickedPerson: any;
  favourites: any[] = [];

  constructor(private storage:Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  async set(key: string, value: any) {
    await this.storage.set(key, value);
  }

  async get(key: string) {
    return await this.storage.get(key);
  }

  //Function to add movie to favourites. Includes logic to first check if the movie already exists.
  async addFavourite(movie: any) {

    //Variable to hold the status of a movie existing in favourites or not.
    let alreadyExists: boolean = false;

    //Loop over favourites and check for a match - if found, movie already in favourites and will break out.
    for (let i = 0; i < this.favourites.length; i++) {
      if (this.favourites[i].id == movie.id) {
        alreadyExists = true;
        break;
      }
    }

    //If the search above didn't find a match then already exists is still false, so add it to favourites.
    if (alreadyExists == false) {
      this.favourites.push(movie);

      //Save the updated list to storage.
      await this.set('favourites', this.favourites);
    }
  }

  //Function to remove a favourite - loops through favourites, if a match is found then remove it with the splice function. 
  async removeFavourite(movie: any) {
    for (let i = 0; i < this.favourites.length; i++) {
      if (this.favourites[i].id == movie.id) {
        this.favourites.splice(i, 1);
        break;
      }
    }
    //Save the updated list to storage.
    await this.set('favourites', this.favourites);
  }
  
}
