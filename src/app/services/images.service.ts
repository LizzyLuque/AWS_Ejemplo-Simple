import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  //peticiones Ajax

import { environment } from 'src/environments/environment';
import ServicesCommon from '../Common/services.common'
import * as AWS from 'aws-sdk';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private url: string;
  private mimes;

  constructor(
    private _http: HttpClient
  ) {
    AWS.config.update({
      accessKeyId: environment.AccessKey,
      secretAccessKey: environment.SecretKey
    });

    this.url = environment.wsImg;
    this.mimes = {
      jpeg: 'data:image/jpeg;base64,'
    };
  }


  async getUrlByFileName(imageName) {
    const params = {
      Bucket: environment.bucket,
      Key: environment.path + imageName, 
      Expires: 60 * 5
    }

    try {
      const url2 = await new Promise((resolve, reject) => {
        let s3 = new AWS.S3({
          region: environment.region,
          signatureVersion: 'v4'
        });
        s3.getSignedUrl('getObject', params, function (err, url2) {
          if (err) {
            reject(err)
          }
          resolve(url2)

        })
      })
      return url2
    } catch (err) {
      console.log('s3 getObject,  get signedUrl failed');
      throw err
    }
  }

  saveImage(file: any) {
    let headers=ServicesCommon.generateImgHeaders();
    return this._http.put(this.url + "upload?operation=subir", file, { headers: headers });
  }

  updateImage(file: any, name: string) {
    let headers=ServicesCommon.generateImgHeaders();
    return this._http.put(this.url + "upload?operation=actualizar&nombre=" + name, file, { headers: headers });
  }

  deleteImage(name: string) {
    let headers=ServicesCommon.generateImgHeaders();
    return this._http.delete(this.url + "delete?operation=borrar&nombre=" + name, { headers: headers });
  }

  ping() {
    let headers=ServicesCommon.generateImgHeaders();
    //return this._http.put(this.url + "upload?operation=ping", { headers: headers });    
    return this._http.delete(this.url + "delete?operation=ping", { headers: headers });  
  }



}
