import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Student} from '../models/student.model';
import {BackenldessService} from '../global-services/Backendless/backenldess.service';
import {Router} from '@angular/router';
import {LoggerService} from '../global-services/Logger/logger.service';

@Component({
  selector: 'app-table-work',
  templateUrl: './table-work.component.html',
  styleUrls: ['./table-work.component.css'],
})

export class TableWorkComponent implements OnInit {
  UserForFind = '';
  markForFilter = '';
  dateForFilter = '';
  TextButton = 'Выделить двоечников';
  highlightLowScore = false;
  isDeletePopUpVisible: boolean;
  isDeleteStudent: Student;
  isLogDivVisible: boolean;

  // TODO подумать над укорачиванием
  constructor(private _StudentService: BackenldessService,
              private cd: ChangeDetectorRef,
              private _logger: LoggerService,
              private _router: Router) {
    this._StudentService.loadAll();
  }

  ngOnInit() {
    this._StudentService.dbChanged.subscribe(
      () => {
        this.cd.detectChanges();
      }
    );
    this.isLogDivVisible = this._logger.getLogMode() === 'divMode';
  }

  get students(): Student[] {
    return this._StudentService.getStudents();
  }

  get logs(): string[] {
    return this._logger.getLogsToDiv();
  }

  highlighting(): void {
    switch (this.highlightLowScore) {
      case false:
        this.highlightLowScore = true;
        this.TextButton = 'Снять выделение';
        this._logger.log('Двоечники выделены');
        return;
      case true:
        this.highlightLowScore = false;
        this.TextButton = 'Выделить двоечников';
        this._logger.log('Выделение двоечников снято');
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
        this._logger.log('Сортировка по фамилии');
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
        this._logger.log('Сортировка по имени');
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
        this._logger.log('Сортировка по отчеству');
        return;
      case 4:
        this.students.sort(function (a, b) {
          const dateA = +a.dateOfBirth.slice(-4), dateB = +b.dateOfBirth.slice(-4);
          return dateA - dateB;
        });
        this._logger.log('Сортировка по возрасту');
        return;
      case 5:
        this.students.sort(function (student1, student2) {
          return +student1.mark - +student2.mark;
        });
        this._logger.log('Сортировка по оценке');
        return;
    }
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
    return +student.mark >= +this.markForFilter;
  }

  CheckFilterDate(student: Student): boolean {
    const date = new Date(student.dateOfBirth.split('.').reverse().join('-'));
    return date >= new Date(this.dateForFilter.split('.').reverse().join('-'));
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
    this._router.navigateByUrl('add');
  }
}
