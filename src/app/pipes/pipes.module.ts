import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { RedondaPipe } from './redonda.pipe';

@NgModule({
    declarations: [ ImagenPipe, SafeHtmlPipe, RedondaPipe ],
    imports: [ ],
    exports: [ ImagenPipe, SafeHtmlPipe, RedondaPipe ],
    providers: [],
})
export class PipesModule {}
