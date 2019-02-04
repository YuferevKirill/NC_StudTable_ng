import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Student} from '../models/student.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Input() student: Student;
  @Output() hidePopup = new EventEmitter<void>();
  @Output() deleteRow = new EventEmitter<Student>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteStudent(): void {
    this.deleteRow.emit(this.student);
    this.hide();
  }

  hide(): void {
    this.hidePopup.emit();
  }
}