import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Bars } from './barcode.model';

import { environment } from '../environments/environment';
const URL = environment.BACKEND_URL;
export class Barcode {
  private usersUpdated = new Subject<{ List: number[]}>();
constructor(private http: HttpClient) {}
barcodeGenerate(bars: Bars) {

this.http.post<{message: string}>(URL + 'barcode' , bars)
.subscribe((postData) => {
  console.log(postData.message);
});

  }

  getBarcodes() {
   return this.http.get<{message: string , barcodes: Bars[]}>(URL + 'barcode');
  }
  clear() {
    return this.http.put<{message: string}>(URL + 'barcode/deleteAll' , null);
  }
  findAll(acc: number) {
return this.http.get<{message: string , codes: Bars[] }>(URL + 'barcode/find/' + acc);
  }
}
