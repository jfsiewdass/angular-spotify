import { Component, OnDestroy, OnInit, ViewChild, ElementRef, inject, DestroyRef, effect } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs'; //TODO: Programacion reactiva!
import { NgTemplateOutlet, NgIf, NgClass, AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
@Component({
    selector: 'app-media-player',
    templateUrl: './media-player.component.html',
    styleUrls: ['./media-player.component.css'],
    standalone: true,
    imports: [NgTemplateOutlet, NgIf, NgClass, AsyncPipe]
})
export class MediaPlayerComponent {


  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('')
  listObservers$: Array<Subscription> = []
  state: string = 'paused'
  public multimediaService = inject(MultimediaService)
  destroyRef = inject(DestroyRef) 
  constructor() {
    effect(() => {
      const state = this.multimediaService.playerStatusSignal()
      this.state = state;
    })
    // const observer1$ = this.multimediaService.playerStatus$
    // .pipe(takeUntilDestroyed(this.destroyRef))
    //   .subscribe(status => this.state = status)
    // this.listObservers$ = [observer1$]
   }

  handlePosition(event: MouseEvent): void {
    const elNative: HTMLElement = this.progressBar.nativeElement
    const { clientX } = event
    const { x, width } = elNative.getBoundingClientRect()
    const clickX = clientX - x //TODO: 1050 - x
    const percentageFromX = (clickX * 100) / width
    console.log(`Click(x): ${percentageFromX}`);
    this.multimediaService.seekAudio(percentageFromX)

  }


}
