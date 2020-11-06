import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// modulo para trabajar con formularios
import {FormsModule} from '@angular/forms' ;

//modulo para usar servicios REST
import {HttpClientModule} from '@angular/common/http';

//Manupular fechas
import { MomentModule } from 'angular2-moment';

//captcha Module
import { BotDetectCaptchaModule } from 'angular-captcha';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { AboutComponent } from './pages/about/about.component';
import { IndexComponent } from './pages/index/index.component';
import { EditComponent } from './pages/crud/edit/edit.component';
import { NewComponent } from './pages/crud/new/new.component';
import { DeleteComponent } from './pages/crud/delete/delete.component';
import { DetailComponent } from './pages/crud/detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ErrorComponent,
    AboutComponent,
    IndexComponent,
    EditComponent,
    NewComponent,
    DeleteComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpClientModule, // módulo para hacer peticiones REST
    BotDetectCaptchaModule,// captcha
    MomentModule, //manipular fechas
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
