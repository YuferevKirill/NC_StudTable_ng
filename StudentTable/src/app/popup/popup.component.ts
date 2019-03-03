import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Student} from '../models/student.model';
import {BackenldessService} from '../global-services/Backendless/backenldess.service';
import {LoggerService} from '../global-services/Logger/logger.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {

  @Input() student: Student;
  @Output() hidePopup = new EventEmitter<void>();

  constructor(private backenldessService: BackenldessService,
              private logger: LoggerService) {
  }

  ngOnInit(): void {
  }

  private deleteStudent(): void {
    this.backenldessService.deleteStudent(this.student);
    this.hide();
    this.logger.log('Студент удалён', this.student.secondName);
  }

  private hide(): void {
    this.hidePopup.emit();
  }
}
