import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Student} from '../models/student.model';
import {StudentService} from '../Services/Student/student.service';

@Component({
  selector: 'app-table-work',
  templateUrl: './table-work.component.html',
  styleUrls: ['./table-work.component.css'],
})

export class TableWorkComponent implements OnInit {
  UserForFind = '';
  TextButton = 'Выделить двоечников';
  highlightLowScore = false;
  isDeletePopUpVisible: boolean;
  isDeleteStudent: Student;
  markForFilter = '';
  dateForFilter = '';
  AddedStudent: Student;
  studentToEdit: Student;
  isAddPopUpVisible: boolean;
  isChangePopUpVisible: boolean;

  private indexOfChangedStudent: number;

  // TODO подумать над укорачиванием
  constructor(private _StudentService: StudentService) {
  }

  ngOnInit() {
    this._StudentService.loadAll();
  }

  get students(): Student[] {
    return this._StudentService.getStudents();
  }

  highlighting(): void {
    switch (this.highlightLowScore) {
      case false:
        this.highlightLowScore = true;
        this.TextButton = 'Снять выделение';
        return;
      case true:
        this.highlightLowScore = false;
        this.TextButton = 'Выделить двоечников';
        return;
    }
  }

  checkFunc(student: Student): boolean {
    return +student.mark < 3 && this.highlightLowScore === true;
  }

  FindUser(student: Student): boolean {
    const StringForFind = (student.secondName + ' ' + student.name + ' ' + student.patronymic).toLowerCase();
    if (this.UserForFind !== '') {
      return StringForFind.includes((this.UserForFind).toLowerCase());
    }
  }

  Sort(selectedIndex: number): void {
    switch (selectedIndex) {
      case 1:
        this.students.sort(function (student1, student2) {
          const secondNameA = student1.secondName.toLowerCase(), secondNameB = student2.secondName.toLowerCase();
          if (secondNameA < secondNameB) {
            return -1;
          }
          if (secondNameA > secondNameB) {
            return 1;
          }
          return 0;
        });
        return;
      case 2:
        this.students.sort(function (student1, student2) {
          const nameA = student1.name.toLowerCase(), nameB = student2.name.toLowerCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        return;
      case 3:
        this.students.sort(function (student1, student2) {
          const patronymicA = student1.patronymic.toLowerCase(), patronymicB = student2.patronymic.toLowerCase();
          if (patronymicA < patronymicB) {
            return -1;
          }
          if (patronymicA > patronymicB) {
            return 1;
          }
          return 0;
        });
        return;
      case 4:
        this.students.sort(function (a, b) {
          const dateA = +a.dateOfBirth.slice(-4), dateB = +b.dateOfBirth.slice(-4);
          return dateA - dateB;
        });
        return;
      case 5:
        this.students.sort(function (student1, student2) {
          return +student1.mark - +student2.mark;
        });
        return;
    }
  }

  deleteRow(): void {
    const indexToRemove = this.students.findIndex(obj => obj === this.isDeleteStudent);
    this.students.splice(indexToRemove, 1);
  }

  showPopup(student: Student): void {
    this.isDeletePopUpVisible = true;
    this.isDeleteStudent = student;
  }

  hidePopup(): void {
    this.isDeletePopUpVisible = false;
    this.isDeleteStudent = null;
  }

  CheckFilterMark(student: Student): boolean {
    return +student.mark > +this.markForFilter;
  }

  CheckFilterDate(student: Student): boolean {
    const date = new Date(student.dateOfBirth.split('.').reverse().join('-'));
    return date > new Date(this.dateForFilter.split('.').reverse().join('-'));
  }

  CheckFilter(student: Student): boolean {
    if (this.markForFilter !== '' && this.dateForFilter !== '') {
      return this.CheckFilterMark(student) && this.CheckFilterDate(student);
    }
    if (this.markForFilter !== '') {
      return this.CheckFilterMark(student);
    } else if (this.dateForFilter !== '') {
      return this.CheckFilterDate(student);
    } else {
      return true;
    }
  }

  showAddPopup(): void {
    this.isAddPopUpVisible = true;
  }

  hideAddPopup(): void {
    this.isAddPopUpVisible = false;
    this.AddedStudent = null;
  }

  addNewStudent(student: Student): void {
    this._StudentService.loadAll();
    this.isAddPopUpVisible = false;
  }

  ChangeStudent(student: Student): void {
    this.isChangePopUpVisible = true;
    this.studentToEdit = student;
    this.indexOfChangedStudent = this.students.indexOf(student);
  }

  HideChangePopUp(): void {
    this.isChangePopUpVisible = false;
    this.studentToEdit = null;
  }

  EditStudent(editedStudent: Student): void {
    this.isChangePopUpVisible = false;
    //this.students[this.indexOfChangedStudent] = editedStudent;
  }

  clickblead(): void {
    console.log(this.students);
  }
}
