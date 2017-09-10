import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { ImageGalleryComponent } from './image-gallery.component';
import { MaterialManifestModule } from '../../material-manifest/material-manifest.module';
import { ImageViewerService } from '../image-viewer.service';

describe('ImageGalleryComponent', () => {
  let component: ImageGalleryComponent;
  let fixture: ComponentFixture<ImageGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageGalleryComponent],
      imports: [MaterialManifestModule],
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
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
