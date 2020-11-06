import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PeliculaExtendida} from 'src/app/models/pelicula';
import { ImagesService } from 'src/app/services/images.service';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public pelicula: PeliculaExtendida;
  constructor(
    private _peliculaService: PeliculasService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _imagesService: ImagesService    
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;

      this.getPelicula(id);
    });
  }

  getPelicula(id) {
    this._peliculaService.getPelicula(id).subscribe(
      response => {
        this.pelicula = response.Item; //Item se llama el objeto en amazon
        if(this.pelicula.image!="" && this.pelicula.image!=null ){
          this._imagesService.getUrlByFileName(this.pelicula.image).then(data=>{
            this.pelicula.src=data;
          });
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
