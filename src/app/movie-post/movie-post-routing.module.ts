import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviePostPage } from './movie-post.page';

const routes: Routes = [
  {
    path: '',
    component: MoviePostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviePostPageRoutingModule {}
