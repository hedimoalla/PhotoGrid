import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotoDetailsComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule
  ],
  entryComponents: [PhotoDetailsComponent],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {
}
