import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentComponent } from './student/student.component';
import { PopupComponent } from './popup/popup.component';
import { ChangeInfoComponent } from './change-info/change-info.component';
import { AddStudentComponent } from './add-student/add-student.component';
import {ConsoleLoggerService} from './Services/ConsoleLogger/console-logger.service';
import {DivLoggerService} from './Services/DivLogger/div-logger.service';
import {StudentService} from './Services/Student/student.service';
import { ButtonHoverDirective } from './Directives/ButtonHover/button-hover.directive';
import { AgeConverterPipe } from './Pipes/AgeConverter/age-converter.pipe';
import { TableWorkComponent } from './table-work/table-work.component';
import Backendless from 'backendless';
import { environment } from '../environments/environment';
Backendless.initApp(environment.backendless.APP_ID, environment.backendless.API_KEY);


@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    PopupComponent,
    ChangeInfoComponent,
    AddStudentComponent,
    ButtonHoverDirective,
    AgeConverterPipe,
    TableWorkComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    ConsoleLoggerService,
    DivLoggerService,
    StudentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
