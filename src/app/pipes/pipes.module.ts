import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';

@NgModule({
    declarations: [ ImagenPipe, SafeHtmlPipe ],
    imports: [ ],
    exports: [ ImagenPipe, SafeHtmlPipe ],
    providers: [],
})
export class PipesModule {}
