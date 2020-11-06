import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Pelicula } from 'src/app/models/pelicula';
import { ImagesService } from 'src/app/services/images.service';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  public titulo: string;
  public modal: string;
  public pelicula: Pelicula;
  public fileThumb: any;
  public file: any;

  constructor(
    private _router: Router,
    private _peliculaService: PeliculasService,
    private _imagesService: ImagesService
  ) {
    this.pelicula = new Pelicula("", "", 0, "", "");
    this.titulo = "Nueva Reseña";
    this.modal = "guardado";
  }

  ngOnInit(): void {
  }

  async guardar() {
    this._peliculaService.save(this.pelicula).subscribe(
      res => {
        if (this.file) {
          this._imagesService.saveImage(this.file).subscribe((resIS: any) => {
            this.pelicula.image = resIS.fileName;
            this._peliculaService.update(this.pelicula).subscribe(resU => { },
              errU => {
                console.log(`Hubo un error al actualizar el nombre del arhivo en base de datos "${errU}"`);
              });
          }, errIS => {
            console.log(`Hubo un error al guardar la imagen "${errIS}"`);
          });
        }

      },
      err => {
        console.log(<any>err);
      });
  }

  async onSubmit(form) {
    await this.guardar();
    document.getElementById("openModalButton").click();
  }

  redirige() {
    this._router.navigate(['/crud']);
  }

  fileChangeEvent(e) {

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
