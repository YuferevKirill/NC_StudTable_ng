import {EventEmitter, Injectable} from '@angular/core';
import {Student} from '../../models/student.model';
import Backendless from 'backendless';

const studentStore = Backendless.Data.of('Student');

@Injectable({
  providedIn: 'root'
})
export class BackenldessService {

  private students: Student[] = [];
  dbChanged = new EventEmitter();

  constructor() {
  }

  public loadAll(): void {
    studentStore.find()
      .then((students: Student[]) => {
        this.students = students;
        this.dbChanged.emit();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  public getStudents(): Student[] {
    return this.students;
  }

  public addStudent(newStudent: Student): void {
    studentStore.save(newStudent)
      .then(() => {
        this.loadAll();
        this.dbChanged.emit();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public deleteStudent(studentToDelete: Student): void {
    studentStore.remove(studentToDelete.objectId)
      .then(() => {
        this.students = this.students.filter(person => {
          return studentToDelete.objectId !== person.objectId;
        });
        this.dbChanged.emit();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public editStudent(studentToEdit: Student): void {
    studentStore.save(studentToEdit)
      .then(() => {
        this.students = this.students.map(person => {
          return studentToEdit.objectId === person.objectId ? studentToEdit : person;
        });
        this.dbChanged.emit();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public getStudentBySecondName(secondName: string): Student {
    return this.students.find(stud => stud.secondName === secondName);
  }
}
