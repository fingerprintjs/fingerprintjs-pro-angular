import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { environment } from 'src/environments/environment';
import { FingerprintjsProAngularModule } from '@fingerprintjs/fingerprintjs-pro-angular';
import { PreloadedComponent } from './preloaded/preloaded.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, PreloadedComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FingerprintjsProAngularModule.forRoot({
      loadOptions: { apiKey: environment.fingerprintJsProPublicKey },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
