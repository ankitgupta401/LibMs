import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { All } from '../app.service';
import { Books } from '../books.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Books[] = [];
  private booksub: Subscription;
  constructor(private app: All) {
   }
onSubmit(form: NgForm) {
console.log(form);
}
  ngOnInit() {
    this.app.getBooks();
    this.booksub = this.app.getBooksUpdateListener()
    .subscribe((book: Books[]) => {
this.books = book;
    });
  }

}
