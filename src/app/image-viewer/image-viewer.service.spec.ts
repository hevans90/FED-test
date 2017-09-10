import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { ImageViewerService } from './image-viewer.service';
import { Observable } from 'rxjs/Observable';
import { Photo } from './models';

// tslint:disable:no-shadowed-variable

describe('ImageViewerService', () => {

  let backend: MockBackend;
  let service: ImageViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ImageViewerService,
        BaseRequestOptions,
        MockBackend,
        {
          deps: [
            MockBackend,
            BaseRequestOptions
          ],
          provide: Http,
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }
      ]
    });
    const testbed = getTestBed();
    backend = testbed.get(MockBackend);
    service = testbed.get(ImageViewerService);
  });

  function setupConnections(backend: MockBackend, options: any) {
    backend.connections.subscribe((connection: MockConnection) => {
      const responseOptions = new ResponseOptions(options);
      const response = new Response(responseOptions);
      connection.mockRespond(response);
    });
  }

  it('should be created', inject([ImageViewerService], (service: ImageViewerService) => {
    expect(service).toBeTruthy();
  }));

  it('#getPhotos should return an Observable', () => {
    expect(service.getPhotos()).toEqual(jasmine.any(Observable));
  });

  it('#getPhotos should return an Observable of type PhotoResponse', () => {

    setupConnections(backend, {
      body: [
        {
          albumId: 1,
          id: 1,
          title: 'title 1',
          url: 'http://url1',
          thumbnailUrl: 'http://thumburl1'
        },
        {
          albumId: 1,
          id: 2,
          title: 'title 2',
          url: 'http://url2',
          thumbnailUrl: 'http://thumburl2'
        },
        {
          albumId: 1,
          id: 3,
          title: 'title 3',
          url: 'http://url3',
          thumbnailUrl: 'http://thumburl3'
        }],
      status: 200
    });

    service.getPhotos().subscribe((res: Photo[]) => {
      expect(res.length).toEqual(3);
      expect(res[0].albumId).toEqual(1);
      expect(res[0].id).toEqual(1);
      expect(res[0].url).toEqual('http://url1');
      expect(res[0].thumbnailUrl).toEqual('http://thumburl1');
    });
  });
});
