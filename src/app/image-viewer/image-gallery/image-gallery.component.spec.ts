import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGalleryComponent } from './image-gallery.component';
import { MaterialManifestModule } from '../../material-manifest/material-manifest.module';

describe('ImageGalleryComponent', () => {
  let component: ImageGalleryComponent;
  let fixture: ComponentFixture<ImageGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageGalleryComponent],
      imports: [MaterialManifestModule]
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
