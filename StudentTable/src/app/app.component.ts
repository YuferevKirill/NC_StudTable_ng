import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  highlightLowScore: boolean;
  title = 'StudentTable';
  students = [
    {secondName: 'Пупкин', name: 'Василий', patronymic: 'Андреевич', age: '18.11.1996', mark: 4},
    {secondName: 'Папкин', name: 'Игорь', patronymic: 'Григорьевич', age: '21.02.1999', mark: 5},
    {secondName: 'Шапкин', name: 'Владислав', patronymic: 'Александрович', age: '12.10.1983', mark: 2},
    {secondName: 'Шубкин', name: 'Никита', patronymic: 'Борисович', age: '03.05.1994', mark: 3},
    {secondName: 'Лапкин', name: 'Антон', patronymic: 'Романович', age: '22.06.1989', mark: 5},
  ];

  highlighting(): void {
    this.highlightLowScore = !this.highlightLowScore;
  }
}
