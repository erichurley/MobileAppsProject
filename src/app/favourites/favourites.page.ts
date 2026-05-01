import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { Data } from '../services/data';
import { addIcons } from 'ionicons';
import { trashOutline, eyeOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon]
})
export class FavouritesPage implements OnInit {

  favourites: any[] = [];

  constructor(private data: Data, private router:Router) {
    addIcons({trashOutline, eyeOutline});
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
  await this.data.loadFavourites();
  this.favourites = this.data.favourites;
}

//Stores the selected movie in the data service and navigates to the movie-details page. 
  clickMovie(movie: any) {
    this.data.clickedMovie = movie;
    this.router.navigate(['/movie-details']);
  }

  remove(movie: any) {
  this.data.removeFavourite(movie);
  this.favourites = this.data.favourites;
}

}
