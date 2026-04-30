import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { HttpOptions } from '@capacitor/core';
import { Data } from '../services/data';
import { MyHttpService } from '../services/my-http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, RouterLink, IonCard, IonCardContent]
})
export class DetailsPage implements OnInit {

  //Variable to hold selected person
  person: any;

  //Variable to hold person details object
  personDetails: any;

  //Variable to store the api key
  apiKey: string = "87f190fd1f3c1281452f0b3458f9401c";

  //HTTP options object to store API request URL.
    options: HttpOptions = {
      url: ''
    }

  constructor(private data:Data, private mhs:MyHttpService) { }

  //Retrieves selected person from shared data service, calls getPersonDetails() function.
  ngOnInit() {
    this.person = this.data.clickedPerson;
    this.getPersonDetails();
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

}
