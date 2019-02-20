import {Injectable} from '@angular/core';
import {Student} from "../../models/student.model";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ConsoleLoggerService {

  constructor() {
  }

  public consoleLog(logMessage: string, student?: string): void {
    if (student === undefined)
      console.log(logMessage);
    else {
      console.log(logMessage + ` (${student})`);
    }
  }
}
