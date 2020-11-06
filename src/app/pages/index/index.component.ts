import { Component, OnInit } from '@angular/core';
import { PeliculaExtendida } from 'src/app/models/pelicula';
import { ImagesService } from 'src/app/services/images.service';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public peliculas: PeliculaExtendida[];
  public rows: number;
  constructor(
    private _peliculaService: PeliculasService,
    private _imagesService: ImagesService
  ) { }

  ngOnInit(): void {
    this.getPeliculas();
  }

  getPeliculas() {

    this._peliculaService.getPeliculas() .subscribe(
          response => {
            if(response.Items){  ///Items es el nombre del arreglo de amazon
              this.peliculas = response.Items;
              this.rows=this.peliculas.length%3 +1;  
              this.getSrcs();            
            }
          },
          error => {
              console.log(<any>error);
          }
        );
  }

  getSrcs(){
    for (let i=0; i<this.peliculas.length; i++){
      let pelicula= this.peliculas[i];
      if(pelicula.image!="" && pelicula.image!=null ){
        this._imagesService.getUrlByFileName(this.peliculas[i].image).then(data=>{
          this.peliculas[i].src=data;
        });
      }
    }
  }

}
