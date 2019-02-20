import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TableWorkComponent} from "./table-work/table-work.component";
import {AddStudentComponent} from "./student-actions/add-student/add-student.component";
import {ChangeInfoComponent} from "./student-actions/change-info/change-info.component";
import {PopupComponent} from "./popup/popup.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {path: '', component: TableWorkComponent, children:[
      {path: 'add', component: AddStudentComponent},
      {path: 'edit/:secondName', component: ChangeInfoComponent},
      {path: 'delete/:secondName', component: PopupComponent},
    ]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
