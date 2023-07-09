import { Routes } from '@angular/router';
import { HomePageComponent } from './modules/home/pages/home-page/home-page.component';
import { SessionGuard } from '@core/guards/session.guard';


export const appRoutes: Routes = [ //TODO: router-outlet (Padre)
  {
    path: 'auth',
    loadChildren: () => import(`./modules/auth/auth.routes`).then(r => r.authRoutes),
  },
  {
    path: '',//TODO (Private) 🔴🔴
    component: HomePageComponent,
    loadChildren: () => import(`./modules/home/home.routes`).then(r => r.homeRoutes),
    canActivate: [SessionGuard]
  }
];

