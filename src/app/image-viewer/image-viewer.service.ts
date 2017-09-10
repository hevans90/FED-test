import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PhotosResponse, PhotoResponse } from './models';

@Injectable()
export class ImageViewerService {

  private endpointUrl = 'http://jsonplaceholder.typicode.com/photos';

  constructor(private http: Http) { }

  getPhotos(): Observable<PhotosResponse> {
    return this.http.get(this.endpointUrl).map(res => res.json() as PhotosResponse);
  }
}
