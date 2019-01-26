// TODO Сделать возможность фильтрации студентов по дате рождения и среднему баллу. Оставлять в таблице только тех кто попал в фильтр
// TODO Сделать возможность удаления студента, с подтверждением. Подтверждение через попап. После перезагрузки страницы сохранения
//  не обязательно

import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  UserForFind: string;
  TextButton = 'Выделить';
  highlightLowScore = false;
  title = 'StudentTable';
  students = [
    {secondName: 'Пупкин', name: 'Василий', patronymic: 'Андреевич', age: '18.11.1996', mark: 4},
    {secondName: 'Папкин', name: 'Игорь', patronymic: 'Григорьевич', age: '21.02.1999', mark: 1},
    {secondName: 'Шапкин', name: 'Владислав', patronymic: 'Александрович', age: '12.10.1983', mark: 2},
    {secondName: 'Шубкин', name: 'Никита', patronymic: 'Борисович', age: '03.05.1994', mark: 3},
    {secondName: 'Лапкин', name: 'Антон', patronymic: 'Романович', age: '22.06.1989', mark: 5},
  ];

  highlighting(): void  {
    switch (this.highlightLowScore) {
      case false:
        this.highlightLowScore = true;
        this.TextButton = 'Снять выделение';
        return;
      case true:
        this.highlightLowScore = false;
        this.TextButton = 'Выделить';
        return;
    }
  }

  checkFunc(student: { patronymic: string; name: string; age: string; mark: number; secondName: string }): boolean {
    if (student.mark < 3 && this.highlightLowScore === true) {
      return true;
    } else {
      return false;
    }
  }

  FindUser(student: { patronymic: string; name: string; age: string; mark: number; secondName: string }): boolean {
    const StringForFind = student.secondName + ' ' + student.name;
    if (this.UserForFind !== '') {
      if (StringForFind.includes(this.UserForFind)) {
        return true;
      } else {
        return false;
      }
    }
  }

  Sort(selectedIndex: number): void {
    switch (selectedIndex) {
      case 0:
        this.students.sort(function (student1, student2) {
          const nameA = student1.secondName.toLowerCase(), nameB = student2.secondName.toLowerCase()
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        return;
      case 1:
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
      case 2:
        this.students.sort(function (student1, student2) {
          const nameA = student1.patronymic.toLowerCase(), nameB = student2.patronymic.toLowerCase()
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
        this.students.sort(function(a, b) {
          const dateA = +a.age.slice(-4), dateB = +b.age.slice(-4);
          return dateA - dateB;
        });
        return;
      case 4:
        this.students.sort(function (student1, student2) {
          return student1.mark - student2.mark;
        });
        return;
    }
  }
}
