export class Evento {
    constructor(
        public title: string,
        public start: string,
        public end: string,
        public _userId: string,
        public dow?: Array<number>,
        public color?: string,
        public url?: string,
    ) {}
}
