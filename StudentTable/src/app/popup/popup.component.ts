import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Student} from '../models/student.model';
import {BackenldessService} from "../global-services/Backendless/backenldess.service";
import {ConsoleLoggerService} from "../global-services/ConsoleLogger/console-logger.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {

  @Input() student: Student;
  @Output() hidePopup = new EventEmitter<void>();

  constructor(private _StudentService: BackenldessService,
              private _ConsoleLoggerService: ConsoleLoggerService) {
  }

  ngOnInit(): void {
  }

  deleteStudent(): void {
    this._StudentService.deleteStudent(this.student);
    this.hide();
    this._ConsoleLoggerService.consoleLog('Студент удалён', this.student.secondName);
  }

  hide(): void {
    this.hidePopup.emit();
  }
}
