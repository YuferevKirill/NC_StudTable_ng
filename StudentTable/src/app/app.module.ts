import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { PopupComponent } from './popup/popup.component';
import { ButtonHoverDirective } from './Directives/ButtonHover/button-hover.directive';
import { AgeConverterPipe } from './Pipes/AgeConverter/age-converter.pipe';
import { TableWorkComponent } from './table-work/table-work.component';
import { GlobalServicesModule } from "./global-services/global-services.module";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {StudentActionsModule} from "./student-actions/student-actions.module";

import Backendless from 'backendless';
import { environment } from '../environments/environment';


Backendless.initApp(environment.backendless.APP_ID, environment.backendless.API_KEY);

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    PopupComponent,
    ButtonHoverDirective,
    AgeConverterPipe,
    TableWorkComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GlobalServicesModule,
    StudentActionsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
