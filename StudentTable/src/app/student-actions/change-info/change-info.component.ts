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

  constructor(private backenldessService: BackenldessService,
              private logger: LoggerService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => this.studentToEdit = this.backenldessService.getStudentBySecondName(params.secondName));
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
      }, [this.checkFIO]),
      dateOfBirth: new FormControl(this.studentToEdit.dateOfBirth, [Validators.required, this.checkAge]),
      mark: new FormControl(this.studentToEdit.mark, [Validators.required, Validators.pattern(/[0-5]/),
        Validators.maxLength(1),
        Validators.minLength(1)])
    });
  }

  private hideForm(): void {
    this.router.navigateByUrl('/');
  }

  private onSubmit(): void {
    const formValue = this.editStudentForm.value;

    const editedStud: Student = {
      dateOfBirth: formValue.dateOfBirth,
      mark: formValue.mark,
      name: formValue.FIO.name,
      patronymic: formValue.FIO.patronymic,
      secondName: formValue.FIO.secondName,
      objectId: this.studentToEdit.objectId
    };

    this.backenldessService.editStudent(editedStud);
    this.logger.log('Студент изменён', editedStud.secondName);
    this.router.navigateByUrl('/');
  }

  private checkAge(control: FormControl): ValidationErrors {
    const value = control.value.split('-');
    const birthYear = value[0];
    const currentYear = new Date().getFullYear();

    const ageValid = ((currentYear - +birthYear) > 10) && (birthYear >= 1900);

    if (!ageValid) {
      return {invalidAge: 'Возраст не прошёл валидацию'};
    }
    return null;
  }

  private checkFIO(control: FormControl): ValidationErrors {
    const name = control.value['name'].toLowerCase();
    const secondName = control.value['secondName'].toLowerCase();
    const patronymic = control.value['patronymic'].toLowerCase();

    const nameInvalid = ((name === secondName && name !== '')
      || (name === patronymic && patronymic !== '')
      || (secondName === patronymic && secondName !== ''));

    if (nameInvalid) {
      return {invalidFields: 'Имя, фамилия или отчество совпадают'};
    }
    return null;
  }

  private isFIOInvalid(controlName?: string): boolean {
    const controlFIO = this.editStudentForm.get('FIO');

    if (controlName !== undefined) {
      const control = controlFIO.get(controlName);
      return (controlFIO.hasError('invalidFields')) || (control.invalid);
    } else {
      return controlFIO.hasError('invalidFields') || (controlFIO.invalid);
    }
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
