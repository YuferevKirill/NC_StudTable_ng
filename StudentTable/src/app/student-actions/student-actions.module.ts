import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddStudentComponent} from "./add-student/add-student.component";
import {ChangeInfoComponent} from "./change-info/change-info.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AddStudentComponent,
    ChangeInfoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    ReactiveFormsModule
  ]
})
export class StudentActionsModule { }
