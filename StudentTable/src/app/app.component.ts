import {Component} from '@angular/core';
import {Student} from './models/student.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  UserForFind = '';
  TextButton = 'Выделить двоечников';
  highlightLowScore = false;
  students: Student[] = [
    {secondName: 'Пупкин', name: 'Василий', patronymic: 'Андреевич', age: '18.11.1996', mark: 4},
    {secondName: 'Папкин', name: 'Игорь', patronymic: 'Григорьевич', age: '21.02.1999', mark: 1},
    {secondName: 'Шапкин', name: 'Владислав', patronymic: 'Александрович', age: '12.10.1983', mark: 2},
    {secondName: 'Шубкин', name: 'Никита', patronymic: 'Борисович', age: '03.05.1994', mark: 3},
    {secondName: 'Лапкин', name: 'Антон', patronymic: 'Романович', age: '22.06.1989', mark: 5},
  ];
  isDeletePopUpVisible: boolean;
  isDeleteStudent: Student;
  markForFilter = '';
  dateForFilter = '';

  highlighting(): void  {
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
    return student.mark < 3 && this.highlightLowScore === true;
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
          const secondNameA = student1.secondName.toLowerCase(), secondNameB = student2.secondName.toLowerCase()
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
          const nameA = student1.name.toLowerCase(), nameB = student2.name.toLowerCase()
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
          const patronymicA = student1.patronymic.toLowerCase(), patronymicB = student2.patronymic.toLowerCase()
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
        this.students.sort(function(a, b) {
          const dateA = +a.age.slice(-4), dateB = +b.age.slice(-4);
          return dateA - dateB;
        });
        return;
      case 5:
        this.students.sort(function (student1, student2) {
          return student1.mark - student2.mark;
        });
        return;
    }
  }

  deleteRow(student: Student): void {
    const indexToRemove = this.students.findIndex(obj => obj === student);
    this.students.splice(indexToRemove , 1);
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
        return student.mark > +this.markForFilter;
  }

  CheckFilterDate(student: Student): boolean {
    const date = new Date(student.age.split('.').reverse().join('-'));
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
    }  else {
      return true;
    }
  }

  AddNewStudent() {

  }
}
