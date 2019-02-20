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
      let service = new LoggerService();
      if (service.route === 'consoleMode')
        return ConsoleLoggerService;
      else if (service.route === 'divMode')
        return DivLoggerService;
    }},
  ]
})
export class GlobalServicesModule {
}
