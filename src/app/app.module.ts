import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import * as firebase from 'firebase';
import firebaseConfig from './firebase'
import {AngularFireAuthModule} from '@angular/fire/auth'
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage'
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { DatePipe } from '@angular/common';
import { UserService } from './user.sevice';
import { AuthService } from './auth.service';

firebase.initializeApp(firebaseConfig)

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
    
  providers: [
    StatusBar,
    SplashScreen,
    StreamingMedia,
    DatePipe,
    UserService,
    AuthService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
