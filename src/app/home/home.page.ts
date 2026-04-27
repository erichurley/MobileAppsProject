import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonList, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonInput, IonSearchbar } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, RouterLink, IonItem, IonList, CommonModule, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonInput, IonSearchbar, FormsModule],
})
export class HomePage {

  //Variable to store movies data.
  movies: any;

  //Variable to store the text string entered in search bar.
  searchString: string = '';

  //Variable to store current page title.
  homePageTitle: string = "Today's Trending Movies:";

  //HTTP options object to store API request URL.
  options: HttpOptions = {
    url: ''
  }

  //Creates a private instance of MyHttpService for making HTTP requests.
  constructor(private mhs:MyHttpService) {}

  //Uses ngOnInit lifecycle hook to set movies to array and call getTrendingMovies() function.
  ngOnInit() {
    this.movies = [];
    this.getTrendingMovies();
  }

  //Asynchronous function which updates the url and calls get() function from my-http.service.
  async getTrendingMovies() {
    this.options = {
      url: 'https://api.themoviedb.org/3/trending/movie/day?api_key=87f190fd1f3c1281452f0b3458f9401c'
    }
    //Create result variable and assign to it the return from the get() function.
    let result = await this.mhs.get(this.options);

    //Update the movies array with the results from the data returned from the API call using get() function.
    this.movies = result.data.results;
  }

  //Asynchronous function to search movies.
  async searchMovies() {

    //If the searchString is empty, ensure trending movies title is displayed and call getTrendingMovies().
    if (this.searchString === '') {
      this.homePageTitle = "Today's Trending Movies:";
      this.getTrendingMovies();
      return;
    }

    //Sets the URL to the search URL and concatenates the searchString variable to the end.
    this.options = {
      url: 'https://api.themoviedb.org/3/search/movie?api_key=87f190fd1f3c1281452f0b3458f9401c&query=' + this.searchString
    }

    //Updates the homepage title to reflect the search results.
    this.homePageTitle = "Matching Search Results:";

    //Create result variable and assign to it the return from the get() function.
    let result = await this.mhs.get(this.options);

    //Update the movies array with the results from the data returned from the API call using get() function.
    this.movies = result.data.results;

  }
}
