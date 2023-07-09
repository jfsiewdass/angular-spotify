import { Routes } from '@angular/router';


export const homeRoutes: Routes = [
  {
    path: 'tracks',
    loadChildren: () => import('@modules/tracks/tracks.routes').then(r => r.tracksRoutes)
  },
  {
    path: 'favorites',
    loadChildren: () => import('@modules/favorites/favorites.routes').then(r => r.favoriteRoutes)
  },
  {
    path: 'history',
    loadChildren: () => import('@modules/history/history.routes').then(r => r.historyRoutes)
  },
  {
    path: '**',//TODO 404 cuando no existe la ruta
    redirectTo: '/tracks'
  }
];

