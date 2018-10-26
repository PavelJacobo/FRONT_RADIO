export class Noticia {
    constructor(
               public titulo: string,
               public resume: string,
               public contenido: string,
               public tags: string[],
               public categoria: string,
               public img: string,
               public author: any,
               public date: Date,
               public _id?: string
               ) {}
}
