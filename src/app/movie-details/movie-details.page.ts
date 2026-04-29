import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { Data } from '../services/data';
import { HttpOptions } from '@capacitor/core';
import { MyHttpService } from '../services/my-http.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, RouterLink, IonCard, IonCardContent]
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

  //Creates a private instance of data service.
  constructor(private data:Data, private mhs:MyHttpService) { }

  //Retrieves selected movie from shared data service, sets cast & crew variables as arrays, calls getCastAndCrew() function.
  ngOnInit() {
    this.movie = this.data.clickedMovie;
    this.cast = [];
    this.crew = [];
    this.getCastAndCrew();
  }

  //Asynchronous function to retrieve cast & crew movie info.
  async getCastAndCrew() { 

    //Sets the URL to the search URL and concatenates the searchString variable to the end.
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

}
