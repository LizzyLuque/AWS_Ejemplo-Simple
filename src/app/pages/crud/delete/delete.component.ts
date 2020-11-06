import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ImagesService } from 'src/app/services/images.service';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
	selector: 'app-delete',
	templateUrl: './delete.component.html',
	styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
	private image: string;
	constructor(
		private _peliculaService: PeliculasService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _imagesService: ImagesService
	) { }

	ngOnInit(): void {
		this._route.params.subscribe(params => {
			let id = params.id;
			this.image = params.image;
			this.deletePelicula(id);
		});
	}

	deletePelicula(id) {
		this._peliculaService.deletePelicula(id).subscribe(
			response => {
				if (this.image != "") {

					this._imagesService.deleteImage(this.image).subscribe(res => { },
						error => {
							console.log(`Error al intentar borrar la imagen  -"${this.image}"-`);
							console.log(error);
						}
					);
				}
				this._router.navigate(['/crud']);
			},
			error => {
				console.log(<any>error);
			}
		);
	}

}
