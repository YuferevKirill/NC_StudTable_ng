import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormControl, ValidationErrors} from '@angular/forms';
import {Student} from '../../models/student.model';
import {BackenldessService} from "../../global-services/Backendless/backenldess.service";
import {ConsoleLoggerService} from "../../global-services/ConsoleLogger/console-logger.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {

  private newStudent: Student;
  private newStudentForm: FormGroup;

  constructor(private _StudentService: BackenldessService,
              private  _ConsoleLoggerService: ConsoleLoggerService,
              private _router: Router) {
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
      dateOfBirth: new FormControl('', [Validators.required, this.CheckAge]),
      mark: new FormControl('', [Validators.required, Validators.pattern(/[0-5]/),
        Validators.maxLength(1),
        Validators.minLength(1)])
    });
  }

  hideForm(): void {
    this._router.navigateByUrl('/');
  }

  onSubmit(): void {
    const formValue = this.newStudentForm.value;
    this.newStudent = {
      dateOfBirth: formValue.dateOfBirth,
      mark: formValue.mark,
      name: formValue.FIO.name,
      patronymic: formValue.FIO.patronymic,
      secondName: formValue.FIO.secondName
    };
    this._StudentService.addStudent(this.newStudent);
    this._ConsoleLoggerService.consoleLog('Студент добавлен', this.newStudent.secondName);
    this._router.navigateByUrl('/');
  }

  private CheckAge(control: FormControl): ValidationErrors {
    const value = control.value.slice(-4);

    const ageValid = ((2019 - +value) > 10);

    if (!ageValid) {
      return {invalidAge: 'Возраст не прошёл валидацию'};
    }
    return null;
  }

  private CheckName(control: FormControl): ValidationErrors {

    const name = control.value['name'];
    const secondName = control.value['secondName'];
    const patronymic = control.value['patronymic'];

    const nameValid = (name === secondName || name === patronymic || secondName === patronymic);

    if (nameValid) {
      return {invalidFields: 'Имя, фамилия или отчество совпадают'};
    }
    return null;
  }
}
