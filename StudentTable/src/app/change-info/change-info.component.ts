import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Student} from '../models/student.model';
import {StudentService} from '../Services/Student/student.service';

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

  public editStudentForm: FormGroup;

  constructor(private _StudentService: StudentService) {
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
      dateOfBirth: new FormControl(this.studentToEdit.dateOfBirth, [Validators.required, this.CheckAge]),
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

    this.studentToEdit.secondName = formValue.FIO.secondName;
    this.studentToEdit.name = formValue.FIO.name;
    this.studentToEdit.patronymic = formValue.FIO.patronymic;
    this.studentToEdit.dateOfBirth = formValue.dateOfBirth;
    this.studentToEdit.mark = formValue.mark;

    this._StudentService.editStudent(this.studentToEdit);
    this.EditStudent.emit();
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
