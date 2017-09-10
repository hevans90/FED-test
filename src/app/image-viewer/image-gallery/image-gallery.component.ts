import { Component, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { ImageViewerService } from '../image-viewer.service';
import { DataSource } from '@angular/cdk/collections';
import { Photo } from '../models';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import { MdPaginator } from '@angular/material';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit, AfterViewChecked {

  constructor(private imageViewerService: ImageViewerService) { }

  // md-table properties
  displayedColumns = ['id', 'thumb', 'title'];
  dataSource: PhotoDataSource;
  loadingImages = true;
  @ViewChild(MdPaginator) paginator: MdPaginator;

  // client-side properties
  loadedImages: Photo[];

  ngOnInit() {
    this.imageViewerService.getPhotos().subscribe(res => {
      this.loadedImages = res;
      this.dataSource = new PhotoDataSource(this.loadedImages, this.paginator);
    });
  }

  ngAfterViewChecked(): void {
    setTimeout(() => { this.loadingImages = false; }, 1000); // at least 1 second load time for smooth UX
  }

  onPage(val: number) {
    this.dataSource.dataChange.next(val);
  }
}

export class PhotoDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */

  dataChange: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private _photos: Photo[], private _paginator: MdPaginator) {
    super();
  }

  connect(): Observable<Photo[]> {
    const displayDataChanges = [
      this.dataChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._photos.slice();

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() { }
}
