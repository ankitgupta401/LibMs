import { Component, OnInit , OnDestroy} from '@angular/core';
import { NgForm } from '@angular/forms';
import { All } from '../app.service';
import { Books } from '../books.model';
import { Subscription } from 'rxjs';
import { Barcode } from '../barcode.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Books[] = [];
  bookdel: string;
  private booksub: Subscription;
  constructor(private app: All, private bar: Barcode) {
   }
onSubmit(form: NgForm) {
console.log(form);
}
  ngOnInit() {
    this.app.getBooks();
    this.booksub = this.app.getBooksUpdateListener()
    .subscribe(( books: Books[]) => {
this.books = books;
    });
  }
  onDelete(id: string) {
    this.app.onDeleteBook(id);
  }
  getDel(id: string) {
    this.bookdel = id;
    }
    ngOnDestroy() {
      this.booksub.unsubscribe();
    }


addBarCode(accNo: number) {
if ( this.bar.accList.length <= 0) {
  this.bar.barcodeGenerate(accNo);
  alert('Barcode is generated in the NEW BOOK ENTRY PAGE inside the Print option');
} else {
if ( this.bar.accList.filter(u => u === accNo )) {
alert('Already Exists in the NEW BOOK ENTRY PAGE inside the Print option');
}
}

}






}
