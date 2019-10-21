import { HttpClient } from '@angular/common/http';
import { Books } from './books.model';
import { Libcard } from './Libcard.model';
import { Subject } from 'rxjs';
import { delay } from 'q';

export class All {
private books: Books[] = [];
private libCard: Libcard[] = [];
private usersUpdated = new Subject<Libcard[]>();
private booksUpdated = new Subject<Books[]>();

constructor(private http: HttpClient) {}

addLibCard(LibCard: Libcard) {
   this.http.post<{message: string }>('http://localhost:3000/api/users', LibCard)
  .subscribe((responseData => {
    console.log(responseData.message);
    this.libCard.push(LibCard);
    this.usersUpdated.next([...this.libCard]);
  }));
}
getUsers() {
this.http.get<{ message: string, users: Libcard[]}>('http://localhost:3000/api/users')
 .subscribe((postData) => {
this.libCard = postData.users;
this.usersUpdated.next([...this.libCard]);

 });
}
getUsersUpdateListener() {
  return this.usersUpdated.asObservable();
}
addBooks(book: Books) {
  this.http.post<{ message: string}>('http://localhost:3000/api/books', book)
  .subscribe(( responseData) => {
    console.log(responseData.message);
    this.books.push(book);
    this.booksUpdated.next([...this.books]);
  });
  return ({
    message: 'done'
  });
}

getBooks() {
  this.http.get<{ message: string, books: Books[] }>('http://localhost:3000/api/books')
  .subscribe((postData) => {
    this.books = postData.books;
    this.booksUpdated.next([...this.books]);
    console.log(postData.books);
  });
}
getBooksUpdateListener() {
  return this.booksUpdated.asObservable();
}
DeleteUser(userid: string) {
  this.http.delete('http://localhost:3000/api/users/' + userid )
.subscribe(() => {
  const updatedUsers = this.libCard.filter( libCard => libCard._id !== userid);
  this.libCard = updatedUsers;
  this.usersUpdated.next([...this.libCard]);
});
}
onDeleteBook(bookid: string) {
  this.http.delete('http://localhost:3000/api/books/' + bookid)
  .subscribe(() => {
    const updatedBooks = this.books.filter( books => books._id !== bookid );
    this.books = updatedBooks;
    this.booksUpdated.next([...this.books]);
  });
}
getCard(id: string) {
  return {...this.libCard.find(c => c._id === id)};
}
updateUser(card: Libcard) {

  this.http.put('http://localhost:3000/api/users/' + card._id , card)
.subscribe((response) => {
  const updatedusers = [...this.libCard];
  const oldPostIndex = updatedusers.findIndex(u => u._id === card._id);
  updatedusers[oldPostIndex] = card;
  this.libCard = updatedusers;
  this.usersUpdated.next([...this.libCard]);

});
}

}
