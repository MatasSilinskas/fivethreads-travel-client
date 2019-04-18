import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './@core/routeGuards/auth.guard.service';
import { ApiInterceptor } from './@core/utils/api.interceptor';
import { NbWindowModule, NbDatepickerModule, NbCalendarRangeModule } from '@nebular/theme';
import { LoginAuthGuard } from './@core/routeGuards/login.guard.service';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NbWindowModule.forRoot(),
    NbDatepickerModule.forRoot(),

    AgmCoreModule.forRoot({
      apiKey: environment.googleAPIKey,
      libraries: ['places']
    }),
  ],
  providers: [
    AuthGuard,
    LoginAuthGuard,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
