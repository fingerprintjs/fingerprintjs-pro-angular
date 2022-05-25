import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { environment } from 'src/environments/environment';
import { NgFingerprintjsProModule } from 'ng-fingerprintjs-pro';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    NgFingerprintjsProModule.forRoot({loadOptions: {apiKey: environment.fingerprintJsProPublicKey}})
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
