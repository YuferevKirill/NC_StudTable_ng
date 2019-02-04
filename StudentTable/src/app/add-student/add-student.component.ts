import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule} from '@angular/forms';
import {Student} from '../models/student.model';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  @Output() AddStudent = new EventEmitter<Student>();
  @Output() HideForm = new EventEmitter<void>();

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
        patronymic: new FormControl('')
      }, [Validators.required, Validators.minLength(5)]),
      Age: new FormControl(''),
      Mark: new FormControl('')
    });
  }

  AddNewStudent(): void {

    this.AddStudent.emit(this.newStudent);
    this.HideForm.emit();
  }

  hideForm(): void {
    this.HideForm.emit();
  }
}
