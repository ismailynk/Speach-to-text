import { Injectable } from '@angular/core';
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root',
})
export class VoiceRecognitionService {
  recognition = new webkitSpeechRecognition();
  public text='';
  public bottext='';
  public num =0;
  public length=0;
  public lastWord = '';
  isStoppedSpeechRecog = false;
  tempWords: any;
  string_parsed : string[] = [];
  transcript_arr : string[] = [];
  confidence_arr : string[] = [];
  karsilik_arr: string[] = ['Merhaba!', 'İyiyim Sen nasılsın?', 'Evet duyuyorum.'];
  hedef_arr : string[] = ['merhaba' , 'nasılsın' , 'duyuyor'];

  isStarted = false; //<< this Flag to check if the user stop the service
  isStoppedAutomatically = true; //<< this Flag to check if the service stopped automaticically.
  constructor() {}

  init() {
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'tr-TR';
    this.karsilik_arr
    this.recognition.addEventListener('result', (e: any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.transcript_arr.push(transcript);
      this.tempWords = transcript;
      console.log(this.transcript_arr);


      this.tanimla();

      const confidence = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.confidence)
        .join('');
      this.confidence_arr.push(confidence);
      console.log(this.confidence_arr);
    });

    this.recognition.addEventListener('end', (condition: any) => {
      this.wordConcat();
      if (this.isStoppedAutomatically) {
        this.recognition.stop();
        console.log('stopped automatically!!');
        this.recognition.start();
        console.log('started automatically!!');
        this.isStoppedAutomatically = true;
      }
    });
  }

  start() {
    if (!this.isStarted) {
      this.recognition.start();
      this.isStarted = true;
      console.log('Speech recognition started');
    }
    return true;
  }
  stop() {
    if (this.isStarted) {
      this.isStoppedAutomatically = false;
      this.wordConcat();
      this.recognition.stop();
      this.isStarted = false;
      console.log('End speech recognition by user');
    }
    return false;
  }
 add(hedef : string , karsilik : string){
   if (hedef && karsilik) {
     this.hedef_arr.push(hedef);
     this.karsilik_arr.push(karsilik);
   }
 }

  tanimla(){
    this.string_parsed = this.tempWords.split(' ');
    console.log('Son Cümle ::: '+this.string_parsed[this.string_parsed.length-1])
    for (var index in this.hedef_arr){
      if (this.string_parsed[this.string_parsed.length-1].toLowerCase()  == this.hedef_arr[index].toLowerCase()){
        this.bottext=this.karsilik_arr[index];
      }
    }


  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';
  }
}
