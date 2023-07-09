import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TracksRoutingModule } from './tracks-routing.module';
import { TracksPageComponent } from './pages/tracks-page/tracks-page.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        TracksRoutingModule,
        SharedModule,
        TracksPageComponent
    ]
})
export class TracksModule { }
