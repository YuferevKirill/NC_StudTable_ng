import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Student} from '../models/student.model';

@Component({
  selector: 'app-change-info',
  templateUrl: './change-info.component.html',
  styleUrls: ['./change-info.component.css']
})
export class ChangeInfoComponent implements OnInit {

  @Input() student: Student;
  @Output() HideForm = new EventEmitter<string>();
  @Output() EditStudent = new EventEmitter<Student>();

  EditedStudent: Student;

  public editStudentForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.formInit();
  }

  private formInit(): void {
    this.editStudentForm = new FormGroup({
      FIO: new FormGroup({
        name: new FormControl(''),
        secondName: new FormControl(''),
        patronymic: new FormControl('', [Validators.required, Validators.minLength(5)])
      }),
      Age: new FormControl(''),
      Mark: new FormControl('')
    });
  }

  hideForm(): void {
    this.HideForm.emit('test');
  }

  onSubmit() {
    const formValue = this.editStudentForm.value;
    this.EditedStudent = {
      age: formValue.Age,
      mark: formValue.Mark,
      name: formValue.FIO.name,
      patronymic: formValue.FIO.patronymic,
      secondName: formValue.FIO.secondName
    };
    this.EditStudent.emit(this.EditedStudent);
  }
}
