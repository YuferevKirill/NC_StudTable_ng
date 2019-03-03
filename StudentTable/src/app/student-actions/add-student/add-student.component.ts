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

  constructor(private backenldessService: BackenldessService,
              private logger: LoggerService,
              private router: Router) {
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
      dateOfBirth: new FormControl('', [Validators.required, this.CheckAge, Validators.pattern(/^\d{1,2}\.\d{1,2}\.\d{4}$/)]),
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

  private CheckAge(control: FormControl): ValidationErrors {
    const value = control.value.slice(-4);

    const ageValid = ((2019 - +value) > 10);

    if (!ageValid) {
      return {invalidAge: 'Возраст не прошёл валидацию'};
    }
    return null;
  }

  private checkFIO(control: FormControl): ValidationErrors {

    const name = control.value['name'];
    const secondName = control.value['secondName'];
    const patronymic = control.value['patronymic'];

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
      return (controlFIO.hasError('invalidFields')) || (control.invalid && control.dirty);
    } else {
      return controlFIO.hasError('invalidFields') || ((controlFIO.get('name').dirty && controlFIO.get('name').invalid));
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
