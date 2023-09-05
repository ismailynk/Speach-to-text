import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '../service/voice-recognition.service';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.css'],
  providers: [VoiceRecognitionService,InputTextModule,ButtonModule],
})
export class SpeechToTextComponent implements OnInit {
  isStillRecoginze = false;
  constructor(public service: VoiceRecognitionService) {
    this.service.init();
  }
  ngOnInit(): void {}
  startService() {
    this.isStillRecoginze = this.service.start() === true ? true : false;
  }

  stopService() {
    this.isStillRecoginze = this.service.stop() === false ? false : true;
  }


}
