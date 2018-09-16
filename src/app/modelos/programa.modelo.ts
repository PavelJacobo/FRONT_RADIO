import { Fecha } from '../interfaces/fecha.interface';

export class Programa {
    constructor (
        public nombre: string,
        public contenido: string,
        public colaboradores?: string[],
        public fecha?: Fecha[],
        public img?: string,
        public _id?: string
    ) {}
}
