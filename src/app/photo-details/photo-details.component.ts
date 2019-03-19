import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import * as licenses from '../licenses.json';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {
  @Input() details: any = {};
  licenses = {};

  constructor(private activeModal: NgbActiveModal) {
    // tslint:disable-next-line: no-unused-expression
    // this.details.description._content;

    licenses.forEach((license, index) => {
      this.licenses[license.id] = license;
    });
  }

  ngOnInit() {
    console.log(this.details);
  }

}
