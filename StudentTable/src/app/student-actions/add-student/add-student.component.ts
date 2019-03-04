import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Student} from '../../models/student.model';
import {BackenldessService} from '../../global-services/Backendless/backenldess.service';
import {Router} from '@angular/router';
import {LoggerService} from '../../global-services/Logger/logger.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {

  private newStudent: Student;
  public newStudentForm: FormGroup;
  private curentDate: Date;

  constructor(private backenldessService: BackenldessService,
              private logger: LoggerService,
              private router: Router) {
    this.curentDate = new Date();
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
      }, [this.checkFIO]),
      dateOfBirth: new FormControl('', [Validators.required, this.сheckAge]),
      mark: new FormControl('', [Validators.required, Validators.pattern(/[0-5]/),
        Validators.maxLength(1),
        Validators.minLength(1)])
    });
  }

  private hideForm(): void {
    this.router.navigateByUrl('/');
  }

  private onSubmit(): void {
    const formValue = this.newStudentForm.value;
    this.newStudent = {
      dateOfBirth: formValue.dateOfBirth,
      mark: formValue.mark,
      name: formValue.FIO.name,
      patronymic: formValue.FIO.patronymic,
      secondName: formValue.FIO.secondName
    };
    this.backenldessService.addStudent(this.newStudent);
    this.logger.log('Студент добавлен', this.newStudent.secondName);
    this.router.navigateByUrl('/');
  }

  private сheckAge(control: FormControl): ValidationErrors {
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
    const controlFIO = this.newStudentForm.get('FIO');

    if (controlName !== undefined) {
      const control = controlFIO.get(controlName);
      return (controlFIO.hasError('invalidFields')) || (control.invalid && control.touched);
    } else {
      return controlFIO.hasError('invalidFields') || (controlFIO.touched && controlFIO.invalid);
    }
  }

  private isAgeInvalid(controlName: string): boolean {
    const control = this.newStudentForm.get(controlName);
    return control.invalid && control.touched;
  }

  private isMarkInvalid(controlName: string): boolean {
    const control = this.newStudentForm.get(controlName);
    return (control.invalid && control.dirty) || (control.touched && control.invalid);
  }
}
