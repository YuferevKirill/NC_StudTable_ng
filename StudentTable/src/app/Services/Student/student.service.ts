import {Injectable} from '@angular/core';
import {Student} from '../../models/student.model';
import Backendless from 'backendless';

const studentStore = Backendless.Data.of('Student');

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[] = [];

  constructor() {
  }

  public loadAll(): void {
    studentStore.find().then((students: Student[]) => {
      this.students = students;
      this.addRealTimeListeners();
    }).catch(function (error) {
      console.log(error);
    });
  }

  private addRealTimeListeners(): void {
    const realTimeHandlers: Backendless.EventHandler = studentStore.rt();

    realTimeHandlers.addCreateListener<Student>(this.onStudentAdd.bind(this));
    realTimeHandlers.addUpdateListener<Student>(this.onStudentChange.bind(this));
    realTimeHandlers.addDeleteListener<Student>(this.onStudentRemove.bind(this));
  }

  private onStudentAdd(newStudent: Student): void {
    this.students.push(newStudent);
  }

  private onStudentChange(updatedStudent: Student): void {
    this.students = this.students.map(person => {
      return updatedStudent.objectId === person.objectId ? updatedStudent : person;
    });
  }

  private onStudentRemove(oldStudent: Student): void {
    this.students = this.students.filter(person => {
      return oldStudent.objectId !== person.objectId;
    });
  }

  public getStudents(): Student[] {
    return this.students;
  }

  public addStudent (newStudent: Student): void {
    studentStore.save(newStudent).catch(function (error) {
      console.log(error);
    });
  }

  public deleteStudent(studentToDelete: Student): void {
    studentStore.remove(studentToDelete.objectId).catch( function (error) {
      console.log(error);
    });
  }

  public editStudent(studentToEdit: Student): void {
    studentStore.save(studentToEdit).catch(function (error) {
      console.log(error);
    });
  }
}
