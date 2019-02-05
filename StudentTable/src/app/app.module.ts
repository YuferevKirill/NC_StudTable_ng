import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentComponent } from './student/student.component';
import { PopupComponent } from './popup/popup.component';
import { ChangeInfoComponent } from './change-info/change-info.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { HoverDirectiveDirective } from './hover-directive.directive';
import { CustomPipePipe } from './custom-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    PopupComponent,
    ChangeInfoComponent,
    AddStudentComponent,
    HoverDirectiveDirective,
    CustomPipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
