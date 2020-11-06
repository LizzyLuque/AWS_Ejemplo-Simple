import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AnyCnameRecord } from 'dns';
import { Pelicula, PeliculaExtendida } from 'src/app/models/pelicula';
import { ImagesService } from 'src/app/services/images.service';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-edit',
  templateUrl: '../new/new.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public titulo:string;
  public modal:string;
  public pelicula:PeliculaExtendida;
  public fileThumb:any;
  public file:any;  

  constructor(
    private _peliculaService: PeliculasService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _imagesService: ImagesService    
  ) { 
    this.titulo="Actualizar Reseña";
    this.modal="actualizada"    ;
    this.pelicula=new PeliculaExtendida("","",0,"","");
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getPelicula(id);
    });    
  }

  getPelicula(id) {
    this._peliculaService.getPelicula(id).subscribe(
      response => {
        this.pelicula.setData(response.Item);  ///Items es el nombre del arreglo de amazon
        if(this.pelicula.image!="" && this.pelicula.image!=null ){
          this._imagesService.getUrlByFileName(this.pelicula.image).then(data=>{
            this.pelicula.src=data;
            this.fileThumb=data;
          });
        }        
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  onSubmit(form){
    let peliculaDB=new Pelicula("","",0,"","");
    peliculaDB.setData(this.pelicula);
    this._peliculaService.update(peliculaDB).subscribe(
      res=>{
        if(this.file){
          if(this.pelicula.image){
            this._imagesService.updateImage(this.file,this.pelicula.image).subscribe(resIU=>{},errIU=>{
              console.log(`Hubo un error al actualizar la imagen "${errIU}"`);
            });
          } else{
            this._imagesService.saveImage(this.file).subscribe((resIS:any)=>{              
              peliculaDB.image=resIS.fileName;
              this._peliculaService.update(peliculaDB).subscribe(resU=>{},
                errU=>{
                console.log(`Hubo un error al actualizar el nombre del arhivo en base de datos "${errU}"`);
              });
            },errIS=>{
               console.log(`Hubo un error al guardar la imagen "${errIS}"`);
            });
          }
        }
        document.getElementById("openModalButton").click();
                
      }, 
      err=>{
        console.log(`Hubo un error al actualizar los datos en base de datos "${err}"`);
      });    
  }

  redirige(){
    this._router.navigate(['/crud']);
  }


  fileChangeEvent(e) {
    //this.file = e.target.files[0];
    var reader = new FileReader();   
    reader.onload = (_event) => { 
      this.fileThumb = reader.result; 
    }
    reader.readAsDataURL(e.target.files[0]);    

    var reader2 = new FileReader();   
    reader2.onload = (_event) => { 
      this.file = reader2.result; 
    }
    reader2.readAsArrayBuffer(e.target.files[0]);   
  }

}
