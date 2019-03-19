import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PhotoGrid';
  @Input() galleryId = '72157705347519995';
  endpoint = 'galleries';
  page = 1;
  details: any = {
    photos: {
      pages: 1
    }
  };

  constructor(private modalService: NgbModal, private http: HttpClient) {
    this.getPhotos();
  }

  nextPage() {
    console.log(this.page);
    this.page = ++this.page;
    console.log(this.page);
    this.getPhotos();
  }
  previousPage() {
    this.page = --this.page;
    this.getPhotos();
  }

  // https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
  getPhotoUrl(photo) {
    return 'http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' +
      photo.id + '_' + photo.secret + '.jpg';
  }
  getPhotos() {
    this.http.get(environment.apiMiddleware + '/' + this.endpoint + '/' + this.galleryId + '/' + this.page)
      .subscribe((res) => {
        console.log(res);
        this.details = res;
      });
  }
  getInfo(photo) {
    this.getDetails(photo.id)
      .subscribe((details) => {
        const modal = this.modalService.open(PhotoDetailsComponent);
        modal.componentInstance.details = details;
      });
  }
  getDetails(id) {
    return this.http.get(environment.apiMiddleware + '/getItem/' + id + '/');
  }
}
