import { Fecha } from '../interfaces/fecha.interface';

export class Programa {
    constructor (
        public nombre: string,
        public contenido: string,
        public colaboradores?: string[] | any,
        public fecha?: Fecha[],
        public img?: string,
        public potcast?: string,
        public facebook?: string,
        public twitter?: string,
        public _id?: string
    ) {}
}
