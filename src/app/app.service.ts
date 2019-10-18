import { HttpClient } from '@angular/common/http';
import { Books } from './books.model';
import { Libcard } from './Libcard.model';
import { Subject } from 'rxjs';

export class All {
private books: Books[] = [];
private libCard: Libcard[] = [];
private usersUpdated = new Subject<Libcard[]>();
private booksUpdated = new Subject<Books[]>();
constructor(private http: HttpClient) {}
addBooks(book: Books) {
  this.books.push(book);
}
addLibCard(LibCard: Libcard) {
  this.http.post<{message: string}>('http://localhost:3000/api/users', LibCard)
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
console.log(postData.users);
 });
}
getUsersUpdateListener() {
  return this.usersUpdated.asObservable();
}
getBooks() {
  this.http.get<{ message: string, books: Books[]}>('http://localhost:3000/api/books')
  .subscribe((postData) => {
    this.books = postData.books;
    this.booksUpdated.next([...this.books]);
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
}
