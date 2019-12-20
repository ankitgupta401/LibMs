import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Bars } from './barcode.model';


export class Barcode {
  private usersUpdated = new Subject<{ List: number[]}>();
constructor(private http: HttpClient) {}
barcodeGenerate(bars: Bars) {

this.http.post<{message: string}>('http://localhost:3000/api/barcode' , bars)
.subscribe((postData) => {
  console.log(postData.message);
});
console.log('here');
  }

  getBarcodes() {
   return this.http.get<{message: string , barcodes: Bars[]}>('http://localhost:3000/api/barcode');
  }
  clear() {
    return this.http.put<{message: string}>('http://localhost:3000/api/barcode/deleteAll' , null);
  }
  findAll(acc: number) {
return this.http.get<{message: string , codes: Bars[] }>('http://localhost:3000/api/barcode/find/' + acc);
  }
}
