import { Programa } from './modelo.index';

export class Usuario {
    constructor(
        public  nombre: string,
        public  email: string,
        public role?: string,
        public  password?: string,
        public programas?: Programa[],
        public img?: string,
        public _id?: string
    ) {}

}
