import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoviePostPageRoutingModule } from './movie-post-routing.module';

import { MoviePostPage } from './movie-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoviePostPageRoutingModule
  ],
  declarations: [MoviePostPage]
})
export class MoviePostPageModule {}
