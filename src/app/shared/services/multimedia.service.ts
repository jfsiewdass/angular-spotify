import { TrackModel } from './../../core/models/tracks.model';
import { EventEmitter, Injectable, effect, signal } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  callback: EventEmitter<any> = new EventEmitter<any>()

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined)
  public trackInfoSignal = signal<TrackModel | undefined>(undefined);
  public audio!: HTMLAudioElement //TODO <audio>
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00')
  public timeElapsedSignal = signal<string>('00:00')
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00')
  public timeRemainingSignal = signal<string>('-00:00')
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused')
  public playerStatusSignal = signal<string>('paused')
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0)
  public playerPercentageSignal = signal<number>(0)

  constructor() {

    this.audio = new Audio()

    // this.trackInfo$.subscribe(responseOK => {
    //   if (responseOK) {
    //     this.setAudio(responseOK)
    //   }
    // })
    effect(() => {
      const dataInfo = this.trackInfoSignal();
      if (dataInfo) this.setAudio(dataInfo)
    })

    this.listenAllEvents()

  }

  private listenAllEvents(): void {

    this.audio.addEventListener('timeupdate', this.calculateTime, false)
    this.audio.addEventListener('playing', this.setPlayerStatus, false)
    this.audio.addEventListener('play', this.setPlayerStatus, false)
    this.audio.addEventListener('pause', this.setPlayerStatus, false)
    this.audio.addEventListener('ended', this.setPlayerStatus, false)

  }

  private setPlayerStatus = (state: any) => {
    switch (state.type) { //TODO: --> playing
      case 'play':
        this.playerStatusSignal.set('play')
        break
      case 'playing':
        this.playerStatusSignal.set('playing')
        break
      case 'ended':
        this.playerStatusSignal.set('ended')
        break
      default:
        this.playerStatusSignal.set('paused')
        break;
    }

  }

  private calculateTime = () => {
    const { duration, currentTime } = this.audio
    this.setTimeElapsed(currentTime)
    this.setRemaining(currentTime, duration)
    this.setPercentage(currentTime, duration)
  }

  private setPercentage(currentTime: number, duration: number): void {
    //TODO duration ---> 100%
    //TODO currentTime ---> (x)
    //TODO (currentTime * 100) / duration
    let percentage = (currentTime * 100) / duration;
    this.playerPercentageSignal.set(percentage)
  }


  private setTimeElapsed(currentTime: number): void {
    let seconds = Math.floor(currentTime % 60) //TODO 1,2,3
    let minutes = Math.floor((currentTime / 60) % 60)
    //TODO  00:00 ---> 01:05 --> 10:15
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `${displayMinutes}:${displaySeconds}`
    this.timeElapsedSignal.set(displayFormat)
  }

  private setRemaining(currentTime: number, duration: number): void {
    let timeLeft = duration - currentTime;
    let seconds = Math.floor(timeLeft % 60)
    let minutes = Math.floor((timeLeft / 60) % 60)
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `-${displayMinutes}:${displaySeconds}`
    this.timeRemainingSignal.set(displayFormat)
  }


  //TODO: Funciones publicas

  public setAudio(track: TrackModel): void {
    this.audio.src = track.url
    this.audio.play()
  }

  public togglePlayer(): void {
    (this.audio.paused) ? this.audio.play() : this.audio.pause()
  }

  public seekAudio(percentage: number): void {
    const { duration } = this.audio
    const percentageToSecond = (percentage * duration) / 100
    this.audio.currentTime = percentageToSecond

  }

}
