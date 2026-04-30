import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { Data } from '../services/data';
import { HttpOptions } from '@capacitor/core';
import { MyHttpService } from '../services/my-http.service';
import { Router } from '@angular/router';

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

  //Creates a private instance of data service, MyHttpService and Router.
  constructor(private data:Data, private mhs:MyHttpService, private router:Router) { }

  //Retrieves selected movie from shared data service, sets cast & crew variables as arrays, calls getCastAndCrew() function.
  ngOnInit() {
    console.log("DETAILS PAGE PERSON:", this.data.clickedPerson?.name);
    this.movie = this.data.clickedMovie;
    this.cast = [];
    this.crew = [];
    this.getCastAndCrew();
  }

  //Required because ngOnInit() was not being triggered when revisiting the same page - this ensures the selected movie
  //and the cast/crew are refreshed each time the page is visited.
  ionViewWillEnter() {
    this.movie = this.data.clickedMovie;
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
    console.log("CLICKED:", person.name);
    this.data.clickedPerson = person;
    this.router.navigate(['/details']);
  }

}
