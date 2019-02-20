import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DivLoggerService {

  private logsToDiv: string[] = [];

  constructor() {
  }

  public log(logMessage: string, student?: string): void {
    if (student === undefined)
      this.logsToDiv.push(logMessage);
    else {
      this.logsToDiv.push(logMessage + ` (${student})`);
    }
  }

  public getLogsToDiv(): string [] {
    return this.logsToDiv;
  }
}
