import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeechToTextComponent } from './speech-rec/speech-to-text.component';

const routes: Routes = [
  {
    path: '',component: AppComponent
  },
  {
    path: 'speech', component: SpeechToTextComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
