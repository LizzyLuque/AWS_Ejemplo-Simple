import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  //peticiones Ajax
import { Observable } from 'rxjs';

import { Pelicula } from '../models/pelicula';
import { environment } from 'src/environments/environment';
import ServicesCommon from '../Common/services.common'

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private peliculas: Pelicula[];
  private url: string; 

  constructor(
    private _http: HttpClient
  ) {
    this.url=environment.wsUrl;
  }


  getPeliculas(): Observable<any> {
    let headers=ServicesCommon.generateHeaders();
    return this._http.get(this.url+"?operation=list&tableName=movie",{headers: headers});
  }

  getPelicula(id): Observable<any> {
    let headers=ServicesCommon.generateHeaders();
    return this._http.get(this.url+"?operation=read&tableName=movie&_id="+id,{headers: headers});
  }

  deletePelicula(id): Observable<any>{
    let headers=ServicesCommon.generateHeaders();
    return this._http.delete(this.url+"?operation=delete&tableName=movie&_id="+id,{headers: headers});    
  }

  save(pelicula:Pelicula): Observable<any>{
    pelicula.date=Date.now();
    let paramPel = JSON.stringify(pelicula);
     const paramsRaw=`
    {
      "operation":"create",
      "tableName":"movie",
      "payload":{
          "Item":${paramPel}
       }
    }`;

    let headers=ServicesCommon.generateHeaders();
    return this._http.post(this.url,paramsRaw,{headers: headers});  

  } 
  
  update(pelicula:Pelicula): Observable<any> {
    let paramPel = JSON.stringify(pelicula);
     const paramsRaw=`
    {
      "operation":"create",
      "tableName":"movie",
      "payload":{
          "Item":${paramPel}
       }
    }`;

    let headers=ServicesCommon.generateHeaders();
    return this._http.post(this.url,paramsRaw,{headers: headers});  
  } 
}
