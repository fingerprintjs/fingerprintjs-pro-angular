import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { environment } from 'src/environments/environment';
import { FingerprintjsProAngularModule } from '@fingerprintjs/fingerprintjs-pro-angular';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    FingerprintjsProAngularModule.forRoot({
      loadOptions: { apiKey: environment.fingerprintJsProPublicKey },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
