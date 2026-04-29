import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { Data } from '../services/data';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, RouterLink, IonCard, IonCardHeader, IonCardTitle, IonCardContent]
})
export class MovieDetailsPage implements OnInit {

  movie: any;

  //Creates a private instance of data service.
  constructor(private data:Data) { }

  //Retrieves selected movie from shared data service
  ngOnInit() {
    this.movie = this.data.clickedMovie;
  }

}
