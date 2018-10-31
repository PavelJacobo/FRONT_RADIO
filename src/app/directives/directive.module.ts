import { NgModule } from '@angular/core';
import { FullcalendarDirective } from './fullcalendar.directive';
import { RadioDirective } from './radio.directive';

@NgModule({
    declarations: [
        FullcalendarDirective,
        RadioDirective
    ],
    imports: [],
    exports: [
        FullcalendarDirective,
        RadioDirective
        ],
    providers: [],
})
export class DirectiveModule {}
