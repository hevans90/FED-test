import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Photo } from './models';

@Injectable()
export class ImageViewerService {

  private endpointUrl = 'http://jsonplaceholder.typicode.com/photos';

  constructor(private http: Http) { }

  getPhotos(): Observable<Photo[]> {
    return this.http.get(this.endpointUrl).map(res => res.json());
  }
}
