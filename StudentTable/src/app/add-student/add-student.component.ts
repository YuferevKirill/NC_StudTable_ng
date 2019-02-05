import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, Validators, FormControl, ValidationErrors} from '@angular/forms';
import {Student} from '../models/student.model';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddStudentComponent implements OnInit {

  @Output() addNewStudent = new EventEmitter<Student>();
  @Output() HideForm = new EventEmitter<void>();

  newStudent: Student;

  public newStudentForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.formInit();
  }

  private formInit(): void {
    this.newStudentForm = new FormGroup({
      FIO: new FormGroup({
        secondName: new FormControl('', [Validators.required, Validators.pattern(/[А-я]/)]),
        name: new FormControl('', [Validators.required, Validators.pattern(/[А-я]/)]),
        patronymic: new FormControl('', [Validators.required, Validators.pattern(/[А-я]/)])
      }, [this.CheckName]),
      age: new FormControl('', [Validators.required, this.CheckAge]),
      mark: new FormControl('', [Validators.required, Validators.pattern(/[0-5]/),
        Validators.maxLength(1),
        Validators.minLength(1)])
    });
  }

  hideForm(): void {
    this.HideForm.emit();
  }

  onSubmit(): void {
    const formValue = this.newStudentForm.value;
    this.newStudent = {
      age: formValue.age,
      mark: formValue.mark,
      name: formValue.FIO.name,
      patronymic: formValue.FIO.patronymic,
      secondName: formValue.FIO.secondName
    };
    this.addNewStudent.emit(this.newStudent);
  }

  private CheckAge(control: FormControl): ValidationErrors {
    const value = control.value.slice(-4);

    const ageValid = ((2019 - +value) > 10);

    if (!ageValid) {
      return { invalidAge: 'Возраст не прошёл валидацию' };
    }
    return null;
  }

  private CheckName(control: FormControl): ValidationErrors {

    const name = control.value['name'];
    const secondName = control.value['secondName'];
    const patronymic = control.value['patronymic'];

    const nameValid = (name === secondName || name === patronymic || secondName === patronymic);

    if (nameValid) {
      return { invalidFields: 'Имя, фамилия или отчество совпадают' };
    }
    return null;
  }
}
