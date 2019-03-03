import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Student} from '../models/student.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {

  @Input() student: Student;
  @Input() index: number;
  @Output() showPopup = new EventEmitter<Student>();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  private onDelete(): void {
    // this.router.navigate(['/delete', this.student.secondName]);
    this.showPopup.emit(this.student);
  }

  private onChange(): void {
    this.router.navigate(
      ['/edit', this.student.secondName]
      // {
      //   queryParams:{
      //     'name': this.student.name,
      //     'secondName': this.student.secondName,
      //     'patronymic': this.student.patronymic,
      //     'mark':this.student.mark,
      //     'dateOfBirth': this.student.dateOfBirth,
      //     'objectId': this.student.objectId
      //   }
      // }
    );
  }
}
