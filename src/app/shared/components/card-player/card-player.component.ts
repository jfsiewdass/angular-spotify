import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { ImgBrokenDirective } from '../../directives/img-broken.directive';
import { NgIf, NgClass } from '@angular/common';
import { inject } from '@angular/core';

@Component({
    selector: 'app-card-player',
    templateUrl: './card-player.component.html',
    styleUrls: ['./card-player.component.css'],
    standalone: true,
    imports: [NgIf, NgClass, ImgBrokenDirective]
})
export class CardPlayerComponent implements OnInit {
  @Input({required: true}) mode: 'small' | 'big' = 'small'
  @Input({required: true}) track: TrackModel = { _id: 0, name: '', album: '', url: '', cover: '' };

  private multimediaService = inject(MultimediaService)
  constructor() { }

  ngOnInit(): void {
  }

  sendPlay(track: TrackModel): void {
     this.multimediaService.trackInfoSignal.set(track)
    // this.multimediaService.trackInfo$.next(track)
  }

}
