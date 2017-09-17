import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { ImageViewerService } from '../image-viewer.service';
import { DataSource } from '@angular/cdk/collections';
import { Photo } from '../models';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { MdPaginator } from '@angular/material';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit, AfterViewChecked {

  constructor(private imageViewerService: ImageViewerService) { }

  // md-table properties
  displayedColumns = ['thumb', 'title'];
  dataSource: PhotoDataSource;
  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild('filter') filter: ElementRef;

  // component specific properties
  loadedImages: Photo[];
  loadingImages = true;


  ngOnInit() {
    this.imageViewerService.getPhotos().subscribe(res => {
      this.loadedImages = res;
      this.dataSource = new PhotoDataSource(this.loadedImages, this.paginator);
    });

    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  ngAfterViewChecked(): void {
    setTimeout(() => { this.loadingImages = false; }, 1000); // at least 1 second load time for smooth UX
  }

  onPage(val: number) {
    this.dataSource.pageChange.next(val);
  }
}

export class PhotoDataSource extends DataSource<any> {

  // pagination Subject
  pageChange: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  // filtration Subject
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private _photos: Photo[], private _paginator: MdPaginator) {
    super();
  }

  connect(): Observable<Photo[]> {
    const displayDataChanges = [
      this.pageChange,
      this._filterChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      let data: Photo[] = this._photos.slice(); // paramaterless call returns new copy of object

      data = data.filter((photo: Photo) => {
        return photo.title.indexOf(this.filter.toLowerCase()) !== -1;
      });

      this._paginator.length = data.length;

      if (this._paginator.length / (this._paginator.pageIndex * this._paginator.pageSize) < 1) {
        // if the current page is beyond the total data length, reset it (i.e. for combinations of paging & filtering)
        this._paginator.pageIndex = 0;
      }

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() { }
}
