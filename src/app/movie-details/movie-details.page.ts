import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { Data } from '../services/data';
import { HttpOptions } from '@capacitor/core';
import { MyHttpService } from '../services/my-http.service';
import { Router, RouterLink } from '@angular/router';
import { heart, home } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCard, IonCardContent, IonIcon, RouterLink]
})
export class MovieDetailsPage implements OnInit {

  //Variable to hold selected movie data
  movie: any;

  //Variable to hold cast data
  cast: any;

  //Variable to hold crew data
  crew: any;
  
  //Variable to store the api key
  apiKey: string = "87f190fd1f3c1281452f0b3458f9401c";

  //HTTP options object to store API request URL.
  options: HttpOptions = {
    url: ''
  }

  //Variables to store favourites button text & colour which change depending on whether movie is already in favourites or not.
  buttonText: string = "Add To Favourites";
  buttonFill: string = "solid";
  buttonColour: string = "success";

  //Creates a private instance of data service, MyHttpService and Router.
  constructor(private data:Data, private mhs:MyHttpService, private router:Router) { 
    addIcons({heart, home});
  }

  //Retrieves selected movie from shared data service, sets cast & crew variables as arrays, calls getCastAndCrew() function.
  ngOnInit() {
    this.movie = this.data.clickedMovie;
    this.cast = [];
    this.crew = [];
  }

  //Ensures the selected movie, favourites state, and cast/crew are refreshed each time the page is opened.
  async ionViewWillEnter() {
    this.movie = this.data.clickedMovie;
    await this.data.loadFavourites();

    //Check if the movie is in favourites and update the button text and style.
    if (this.isFavourite()) {
      this.buttonText = "Remove From Favourites";
      this.buttonFill = "solid";
      this.buttonColour = "danger";

    } else {
        this.buttonText = "Add To Favourites";
        this.buttonFill = "outline";
        this.buttonColour = "success";
    }

    this.getCastAndCrew();
  }

  //Asynchronous function to retrieve cast & crew movie info.
  async getCastAndCrew() { 

    //Sets the URL to the movie URL and concatenates the movie ID and API Key variable to complete the URL for the API call.
    this.options = {
      url: 'https://api.themoviedb.org/3/movie/' + this.movie.id + '/credits?api_key=' + this.apiKey
    }

    //Create result variable and assign to it the return from the get() function.
    let result = await this.mhs.get(this.options);

    //Update the cast array with the results from the data returned from the API call using get() function.
    this.cast = result.data.cast;

    //Update the crew array with the results from the data returned from the API call using get() function.
    this.crew = result.data.crew;

  }

  //Stores the selected person in the data service and navigates to the details page. 
  clickPerson(person: any) {
    this.data.clickedPerson = person;
    this.router.navigate(['/details']);
  }

  //Add movie to favourites
  addToFavourites() {
    this.data.addFavourite(this.movie);
  }

  //Remove movie from favourites
  removeFromFavourites() {
    this.data.removeFavourite(this.movie);
  }

  //Check if the movie is already in favourites - used to change the state of the favourites button text & style.
  isFavourite() {

  //Loop through favourites and check if current movie is in there - return true if so, otherwise return false.
    for (let i = 0; i < this.data.favourites.length; i++) {
      if (this.data.favourites[i].id == this.movie.id) {
        return true;
      }
  }
  return false;
}

  //Toggles the movie between being added to or removed from favourites and updates the button.
  toggleFavourite() {
    if (this.isFavourite()) {
      this.data.removeFavourite(this.movie);
      this.buttonText = "Add To Favourites";
      this.buttonFill = "outline";
      this.buttonColour = "success";

    } else {
        this.data.addFavourite(this.movie);
        this.buttonText = "Remove From Favourites";
        this.buttonFill = "solid";
        this.buttonColour = "danger";
    }
  }

}
