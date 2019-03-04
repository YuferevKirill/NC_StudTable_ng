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
  userForFind = '';
  markForFilter = '';
  dateForFilter = '';
  textButton = 'Выделить двоечников';
  highlightLowScore = false;
  isDeletePopUpVisible: boolean;
  isDeleteStudent: Student;
  isLogDivVisible: boolean;

  constructor(private backenldessService: BackenldessService,
              private changeDetector: ChangeDetectorRef,
              private logger: LoggerService,
              private router: Router) {
    this.backenldessService.loadAll();
  }

  ngOnInit() {
    this.backenldessService.dbChanged.subscribe(
      () => {
        this.changeDetector.detectChanges();
      }
    );
    this.isLogDivVisible = this.logger.getLogMode() === 'divMode';
  }

  get students(): Student[] {
    return this.backenldessService.getStudents();
  }

  get logs(): string[] {
    return this.logger.getLogsToDiv();
  }

  private highlighting(): void {
    switch (this.highlightLowScore) {
      case false:
        this.highlightLowScore = true;
        this.textButton = 'Снять выделение';
        this.logger.log('Двоечники выделены');
        return;
      case true:
        this.highlightLowScore = false;
        this.textButton = 'Выделить двоечников';
        this.logger.log('Выделение двоечников снято');
        return;
    }
  }

  private checkFunc(student: Student): boolean {
    return +student.mark < 3 && this.highlightLowScore === true;
  }

  private findUser(student: Student): boolean {
    const StringForFind = (student.secondName + ' ' + student.name + ' ' + student.patronymic).toLowerCase();
    if (this.userForFind !== '') {
      return StringForFind.includes((this.userForFind).toLowerCase());
    }
  }

  private sort(selectedIndex: number): void {
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
        this.logger.log('Сортировка по фамилии');
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
        this.logger.log('Сортировка по имени');
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
        this.logger.log('Сортировка по отчеству');
        return;
      case 4:
        this.students.sort(function (a, b) {
          const dateA = +a.dateOfBirth.slice(-4), dateB = +b.dateOfBirth.slice(-4);
          return dateA - dateB;
        });
        this.logger.log('Сортировка по возрасту');
        return;
      case 5:
        this.students.sort(function (student1, student2) {
          return +student1.mark - +student2.mark;
        });
        this.logger.log('Сортировка по оценке');
        return;
    }
  }

  private showPopup(student: Student): void {
    this.isDeletePopUpVisible = true;
    this.isDeleteStudent = student;
  }

  private hidePopup(): void {
    this.isDeletePopUpVisible = false;
    this.isDeleteStudent = null;
  }

  private checkFilterMark(student: Student): boolean {
    return +student.mark >= +this.markForFilter;
  }

  private checkFilterDate(student: Student): boolean {
    const date = new Date(student.dateOfBirth.split('.').reverse().join('-'));
    return date >= new Date(this.dateForFilter.split('.').reverse().join('-'));
  }

  private checkFilter(student: Student): boolean {
    if (this.markForFilter !== '' && this.dateForFilter !== '') {
      return this.checkFilterMark(student) && this.checkFilterDate(student);
    }
    if (this.markForFilter !== '') {
      return this.checkFilterMark(student);
    } else if (this.dateForFilter !== '') {
      return this.checkFilterDate(student);
    } else {
      return true;
    }
  }

  private showAddPopup(): void {
    this.router.navigateByUrl('add');
  }
}
