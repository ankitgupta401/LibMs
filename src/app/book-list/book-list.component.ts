import { Component, OnInit , OnDestroy} from '@angular/core';
import { NgForm } from '@angular/forms';
import { All } from '../app.service';
import { Books } from '../books.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Books[] = [];
  bookdel: string;
  private booksub: Subscription;
  constructor(private app: All) {
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
}
