import {Injectable} from '@angular/core';
import {Student} from "../../models/student.model";

@Injectable({
  providedIn: 'root'
})

// для того, чтобы переключить режим логирования нужно ввести параметры в адресную строку
// пример: http://localhost:4200/?logMode=consoleMode
// logMode=consoleMode для смены режима логирования в консоль
// logMode=divMode для смены режима логирования в div на страничке
// по умолчанию включено логирование в консоль.

export class LoggerService {

  private logsToDiv: string[] = [];

  public log: Function;
  private logMode = 'consoleMode';

  constructor() {
    this.makeParam(window.location.href)
  }

  public getLogsToDiv(): string [] {
    return this.logsToDiv;
  }

  public getLogMode(): string {
    return this.logMode
  }

  public setLogFunction(func: Function): void {
    this.log = func;
  }

  private makeParam(href: string): void {
    let param = href.split('logMode=');
    if (param[1] === 'consoleMode' || param[1] === 'divMode')
      this.logMode = param[1];
  }
}
