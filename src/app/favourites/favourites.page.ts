import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { Data } from '../services/data';
import { addIcons } from 'ionicons';
import { trashOutline, eyeOutline, home } from 'ionicons/icons';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, RouterLink]
})
export class FavouritesPage implements OnInit {

  //Array used to store list of favourite movies.
  favourites: any[] = [];

  //Initialises the icons and injects services.
  constructor(private data: Data, private router:Router) {
    addIcons({trashOutline, eyeOutline, home});
  }

  //Lifecycle hook - not used here.
  ngOnInit() {
  }

  //Load favourites from storage each time page is entered.
  async ionViewWillEnter() {
  await this.data.loadFavourites();
  this.favourites = this.data.favourites;
}

//Stores the selected movie in the data service and navigates to the movie-details page. 
  clickMovie(movie: any) {
    this.data.clickedMovie = movie;
    this.router.navigate(['/movie-details']);
  }

  //Remove single movie from favourites and update list.
  remove(movie: any) {
  this.data.removeFavourite(movie);
  this.favourites = this.data.favourites;
}

//Remove all movies from list and set list as empty.
  removeAll() {
  this.data.clearFavourites();
  this.favourites = [];
}

}
