import { v4 as uuidv4 } from 'uuid';
export class Pelicula{
    public _id:string;
    constructor(
        public title:string,
        public image: string,
        public year:number,
        public date:any,
        public review:string        
    ){
        //temporal
        this._id=uuidv4(); 
    }

    setData(pelicula:PeliculaExtendida){
        if(pelicula._id) this._id=pelicula._id;
        this.date=pelicula.date;
        this.image=pelicula.image;
        this.review=pelicula.review;
        this.title=pelicula.title;
        this.year=pelicula.year;
    }
}

export class PeliculaExtendida extends Pelicula{
    public src: any;
}