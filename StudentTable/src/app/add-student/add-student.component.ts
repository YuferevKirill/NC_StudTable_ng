import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Student} from '../models/student.model';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  @Output() addNewStudent = new EventEmitter<Student>();
  @Output() HideForm = new EventEmitter<string>();

  newStudent: Student;

  public newStudentForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.formInit();
  }

  private formInit(): void {
    this.newStudentForm = new FormGroup({
      FIO: new FormGroup({
        name: new FormControl(''),
        secondName: new FormControl(''),
        patronymic: new FormControl('',[Validators.required, Validators.minLength(5)])
      }),
      Age: new FormControl(''),
      Mark: new FormControl('')
    });
  }

  hideForm(): void {
    this.HideForm.emit('test');
  }

  onSubmit() {
    const formValue = this.newStudentForm.value;
    this.newStudent = {
      age: formValue.Age,
      mark: formValue.Mark,
      name: formValue.FIO.name,
      patronymic: formValue.FIO.patronymic,
      secondName: formValue.FIO.secondName
    };
    this.addNewStudent.emit(this.newStudent);
  }
}
