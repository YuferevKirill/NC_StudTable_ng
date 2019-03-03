import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Student} from '../../models/student.model';
import {BackenldessService} from '../../global-services/Backendless/backenldess.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoggerService} from '../../global-services/Logger/logger.service';

@Component({
  selector: 'app-change-info',
  templateUrl: './change-info.component.html',
  styleUrls: ['./change-info.component.css'],
})
export class ChangeInfoComponent implements OnInit {

  public editStudentForm: FormGroup;
  private studentToEdit;

  constructor(private _StudentService: BackenldessService,
              private _logger: LoggerService,
              private _router: Router,
              private _route: ActivatedRoute) {
    this._route.params.subscribe(params => this.studentToEdit = this._StudentService.getStudentBySecondName(params.secondName));
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
    this._router.navigateByUrl('/');
  }

  onSubmit(): void {
    const formValue = this.editStudentForm.value;

    const editedStud: Student = {
      dateOfBirth: formValue.dateOfBirth,
      mark: formValue.mark,
      name: formValue.FIO.name,
      patronymic: formValue.FIO.patronymic,
      secondName: formValue.FIO.secondName,
      objectId: this.studentToEdit.objectId
    };

    this._StudentService.editStudent(editedStud);
    this._logger.log('Студент изменён', editedStud.secondName);
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

  private isAgeInvalid(controlName: string): boolean {
    const control = this.editStudentForm.get(controlName);
    return control.invalid && control.touched;
  }

  private isMarkInvalid(controlName: string): boolean {
    const control = this.editStudentForm.get(controlName);
    return (control.invalid && control.dirty) || (control.touched && control.invalid);
  }
}
