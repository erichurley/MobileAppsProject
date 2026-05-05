import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent, IonList, IonListHeader, IonItem, IonIcon } from '@ionic/angular/standalone';
import { HttpOptions } from '@capacitor/core';
import { Data } from '../services/data';
import { MyHttpService } from '../services/my-http.service';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { home, heart } from 'ionicons/icons';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonList, IonItem, IonListHeader, RouterLink, IonIcon]
})
export class DetailsPage implements OnInit {

  //Used for scrolling the user to the top of the page where IonContent is.
  @ViewChild(IonContent) content!: IonContent;

  //Variable to hold selected person
  person: any;

  //Variable to hold person details object
  personDetails: any;

  //Variable to hold other movies info
  otherMovies: any;

  //Variable to store the api key
  apiKey: string = "87f190fd1f3c1281452f0b3458f9401c";

  //HTTP options object to store API request URL.
    options: HttpOptions = {
      url: ''
    }

  constructor(private data:Data, private mhs:MyHttpService, private router:Router) { 
    addIcons({home, heart});
  }

  //Retrieves selected person from shared data service, calls getPersonDetails() function.
  ngOnInit() {
    this.person = this.data.clickedPerson;
    this.getPersonDetails();
    this.getOtherMovies();
  }

  //Forces scroll back to the top of the page. Runs every time the page loads.
  ionViewDidEnter() {
    this.content.scrollToTop(0);
}

  //Asynchronous function to retrieve person info.
  async getPersonDetails() { 

    //Sets the URL to the person URL and concatenates the person ID and API Key variable to complete the URL for the API call.
    this.options = {
      url: 'https://api.themoviedb.org/3/person/' + this.person.id + '?api_key=' + this.apiKey
    }

    //Create result variable and assign to it the return from the get() function.
    let result = await this.mhs.get(this.options);

    //Update the personDetails array with the results from the data returned from the API call using get() function.
    this.personDetails = result.data;

  }

  //Asynchronous function to retrieve the other movies the person was credited in.
  async getOtherMovies() { 

    //Sets the URL to the person URL and concatenates the person ID, movie credits and API Key variable to complete the URL for the API call.
    this.options = {
      url: 'https://api.themoviedb.org/3/person/' + this.person.id + '/movie_credits?api_key=' + this.apiKey
    }

    //Create result variable and assign to it the return from the get() function.
    let result = await this.mhs.get(this.options);

    //Update the otherMovies variable with the results from the data returned from the API call using get() function.
    this.otherMovies = result.data.cast;

  }

  //Stores selected movie in data service and navigates to movie-details page.
  openOtherMovie(movie: any) {
    this.data.clickedMovie = movie;
    this.router.navigate(['/movie-details']);
  }

}
