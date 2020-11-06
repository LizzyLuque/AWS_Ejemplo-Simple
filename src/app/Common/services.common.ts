import { HttpHeaders } from '@angular/common/http';  //peticiones Ajax

import { environment } from 'src/environments/environment';

import * as crypto from 'crypto-js';
import * as moment from 'moment';

export default class ServicesCommon {

    static getSignatureKey(key, dateStamp, regionName, serviceName) {
        var kDate = crypto.HmacSHA256(dateStamp, "AWS4" + key);
        var kRegion = crypto.HmacSHA256(regionName, kDate);
        var kService = crypto.HmacSHA256(serviceName, kRegion);
        var kSigning = crypto.HmacSHA256("aws4_request", kService);
        return kSigning;
      }    

    static generateImgHeaders(){
        let formattedDate = (moment(Date.now())).format('YYYYMMDD');
        let signature = this.getSignatureKey(environment.SecretKey, formattedDate, environment.region, 'execute-api');


        let headers = new HttpHeaders()
        .set("Content-Type", "image/jpeg") // Si se requiriera subir mas tipos de imagen... aqui se configura el tipo de la imagen a subir
        .set(
          'Authorization', `AWS4-HMAC-SHA256 Credential=${environment.AccessKey}/${formattedDate}/${environment.region}/execute-api/aws4_request, SignedHeaders=content-type;host;x-amz-date, Signature=${signature}`);
        return headers;
      }   

      static generateHeaders(){
        let formattedDate = (moment(Date.now())).format('YYYYMMDD');
        let signature = this.getSignatureKey(environment.SecretKey, formattedDate, environment.region, 'execute-api');


        let headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set(
          'Authorization', `AWS4-HMAC-SHA256 Credential=${environment.AccessKey}/${formattedDate}/${environment.region}/execute-api/aws4_request, SignedHeaders=content-type;host;x-amz-date, Signature=${signature}`);
        return headers;
      }       


}