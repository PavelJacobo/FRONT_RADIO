export class Noticia {
    constructor(
               public titulo: string,
               public resume: string,
               public contenido: string,
               public tags: string,
               public img: string,
               public author: string,
               public date: Date,
               public _id?: string
               ) {}
}
