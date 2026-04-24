import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonList } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, RouterLink, IonItem, IonList, CommonModule],
})
export class HomePage {

  movies: any;

  options: HttpOptions = {
    url: ''
  }

  constructor(private mhs:MyHttpService) {}

  ngOnInit() {
    this.movies = [];
    this.getTrendingMovies();
  }

  async getTrendingMovies() {
    this.options = {
      url: 'https://api.themoviedb.org/3/trending/movie/day?api_key=87f190fd1f3c1281452f0b3458f9401c'
    }
    let result = await this.mhs.get(this.options);
    this.movies = result.data.results;
  }
}
