import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import { TooltipModule, ModalModule, BsDatepickerModule} from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LivrosComponent } from './livros/livros.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


// import { DateTimeFormatPipePipe } from '/_helps/DateTimeFormatPipe.pipe';

@NgModule({
   declarations: [
      AppComponent,
      LivrosComponent
     // DateTimeFormatPipePipe
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      BsDatepickerModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
