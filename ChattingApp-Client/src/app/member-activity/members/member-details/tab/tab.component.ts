import { Component, OnInit, Input } from '@angular/core';
import { User } from 'shared/Models/user';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
})
export class TabComponent implements OnInit {
  @Input() user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor() {}

  ngOnInit() {
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true,
      },
    ];
    this.galleryImages = this.getImages();
  }
  getImages() {
    const imgUrl = [];
    for (const photo of this.user.photos) {
      imgUrl.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description,
      });
    }
    return imgUrl;
  }
}
