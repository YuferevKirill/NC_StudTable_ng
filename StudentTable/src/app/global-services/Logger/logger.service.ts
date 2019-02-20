import { Injectable } from '@angular/core';
import {ConsoleLoggerService} from "../ConsoleLogger/console-logger.service";
import {DivLoggerService} from "../DivLogger/div-logger.service";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  public route: string;

  constructor(private _ConsoleLoggerService?:ConsoleLoggerService,
              private _DivLoggerService?: DivLoggerService,
              private _ActivatedRoute?: ActivatedRoute) {
    this._ActivatedRoute.params.subscribe(params => { if (params.logMode === 'consoleMode' || params.logMode === 'divMode') this.route = params.logMode});
  }
}
