import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import * as licenses from '../licenses.json';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {
  @Input() details: any = {};
  licenses = {};

  constructor() {
    licenses.forEach((license) => {
      this.licenses[license.id] = license;
    });
  }

  ngOnInit() {
  }

}
