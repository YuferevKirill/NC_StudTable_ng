import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsoleLoggerService} from "./ConsoleLogger/console-logger.service";
import {DivLoggerService} from "./DivLogger/div-logger.service";
import {BackenldessService} from "./Backendless/backenldess.service";
import {LoggerService} from "./Logger/logger.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ConsoleLoggerService,
    DivLoggerService,
    BackenldessService,
    {provide: LoggerService, deps: [ConsoleLoggerService, DivLoggerService],
    useFactory: (ConsoleLoggerService, DivLoggerService)=>{
      let loggerService = new LoggerService();
      if (loggerService.getLogMode() === 'consoleMode')
        loggerService.setLogFunction(ConsoleLoggerService.consoleLog);
      else if (loggerService.getLogMode() === 'divMode'){
        loggerService.setLogFunction(DivLoggerService.log);
      }
      return loggerService;
    }}
  ]
})

export class GlobalServicesModule {
}
