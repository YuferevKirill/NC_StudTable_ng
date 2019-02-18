import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Student} from '../models/student.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {

  @Input() student: Student;
  @Input() index: number;
  @Output() showPopup = new EventEmitter<Student>();
  @Output() ChangeStudent = new EventEmitter<Student>();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(): void {
    this.showPopup.emit(this.student);
  }

  onChange() {
    this.ChangeStudent.emit(this.student);
  }
}
