/* Service used to perform HTTP GET requests using CapacitorHttp
allowing API calls for the application. */

import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class MyHttpService {

  //Executes a GET request using the provided HTTP options.
  async get(options: HttpOptions) {
    return await CapacitorHttp.get(options);
  }
  
}
