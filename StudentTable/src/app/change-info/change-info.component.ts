import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Student} from '../models/student.model';

@Component({
  selector: 'app-change-info',
  templateUrl: './change-info.component.html',
  styleUrls: ['./change-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeInfoComponent implements OnInit {

  @Input() studentToEdit: Student;
  @Output() HideForm = new EventEmitter<string>();
  @Output() EditStudent = new EventEmitter<Student>();

  EditedStudent: Student;
  public editStudentForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.formInit();
  }

  private formInit(): void {
    this.editStudentForm = new FormGroup({
      FIO: new FormGroup({
        secondName: new FormControl(this.studentToEdit.secondName,
          [Validators.required, Validators.pattern(/[А-я]/)]),
        name: new FormControl(this.studentToEdit.name,
          [Validators.required, Validators.pattern(/[А-я]/)]),
        patronymic: new FormControl(this.studentToEdit.patronymic,
          [Validators.required, Validators.pattern(/[А-я]/)])
      }, [this.CheckName]),
      age: new FormControl(this.studentToEdit.age, [Validators.required, this.CheckAge]),
      mark: new FormControl(this.studentToEdit.mark, [Validators.required, Validators.pattern(/[0-5]/),
        Validators.maxLength(1),
        Validators.minLength(1)])
    });
  }

  hideForm(): void {
    this.HideForm.emit('test');
    console.log(this.studentToEdit);
  }

  onSubmit(): void {
      const formValue = this.editStudentForm.value;
      this.EditedStudent = {
        age: formValue.age,
        mark: formValue.mark,
        name: formValue.FIO.name,
        patronymic: formValue.FIO.patronymic,
        secondName: formValue.FIO.secondName
      };
      this.EditStudent.emit(this.EditedStudent);
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
