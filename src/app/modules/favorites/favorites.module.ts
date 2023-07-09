import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritePageComponent } from './pages/favorite-page/favorite-page.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        FavoritesRoutingModule,
        SharedModule,
        FavoritePageComponent
    ]
})
export class FavoritesModule { }
