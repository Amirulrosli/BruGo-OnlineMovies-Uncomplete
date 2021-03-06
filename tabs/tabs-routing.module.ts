import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)

      },
      {

        path: 'movie',
        loadChildren: () => import('../movie/movie.module').then(m => m.MoviePageModule)

      },
      {

        path: 'explore',
        loadChildren: () => import('../explore/explore.module').then(m => m.ExplorePageModule)

      },

      {

        path: 'library',
        loadChildren: () => import('../library/library.module').then(m => m.LibraryPageModule)

      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
