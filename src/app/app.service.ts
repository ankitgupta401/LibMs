import { HttpClient } from '@angular/common/http';
import { Books } from './books.model';
import { Libcard } from './Libcard.model';
import { Subject } from 'rxjs';
import { ReceiveReg } from './receiveReg.model';


export class All {
 book: Books[] = [];
private libCard: Libcard[] = [];
 toIssue: Books[] = [];
private usersUpdated = new Subject<{LibCard: Libcard[], count: number}>();
private booksUpdated = new Subject<{BOOKS: Books[], count: number}>();
private toIssuebooksUpdated = new Subject<Books[]>();


constructor(private http: HttpClient) {}
count: number;
bookcount: number;
addLibCard(LibCard: Libcard , image: File) {
  const UserData = new FormData();
  UserData.append('cardNo', LibCard.cardNo.toString());
  UserData.append('fname', LibCard.fname);
  UserData.append('lname', LibCard.lname);
  UserData.append('email', LibCard.email);
  UserData.append('category', LibCard.category);
  UserData.append('Roll', LibCard.Roll.toString());
  UserData.append('dept', LibCard.dept);
  UserData.append('year', LibCard.year);
  UserData.append('sem', LibCard.sem);
  UserData.append('phone_no', LibCard.phone_no.toString());
  UserData.append('address', LibCard.address);
  UserData.append('city', LibCard.city);
  UserData.append('state', LibCard.state);
  UserData.append('zip', LibCard.zip.toString());
  UserData.append('image', image , LibCard.fname);
  this.http.post<{message: string}>('http://localhost:3000/api/users', UserData)
  .subscribe((responseData => {

    console.log(responseData.message);
    this.libCard.push(LibCard);
    this.usersUpdated.next({LibCard: [...this.libCard ], count: this.count });
  }));
}
getUsers(pagesize: number , page: number) {

  const queryParams = `?pagesize=${pagesize}&page=${page}`;
  this.http.get<{ message: string, users: Libcard[], count: number}>('http://localhost:3000/api/users' + queryParams)
 .subscribe((postData) => {
this.libCard = postData.users;
this.count = postData.count;
this.usersUpdated.next({LibCard: [...this.libCard ], count: this.count });
 });
}
getUsersUpdateListener() {
  return this.usersUpdated.asObservable();
}
addBooks(book: Books) {

  this.http.post<{ message: string}>('http://localhost:3000/api/books', book)
  .subscribe(( responseData) => {
    console.log(responseData.message);
    this.book.push(book);
    this.booksUpdated.next({BOOKS: [...this.book], count: this.bookcount});
  });
  return ({
    message: 'done'
  });
}

getBooks(pagesize: number , page: number) {
  const queryParams = `?pagesize=${pagesize}&page=${page}`;
  this.http.get<{ message: string, books: Books[] , count: number}>('http://localhost:3000/api/books' + queryParams)
  .subscribe((postData) => {

    this.book = postData.books;
    this.bookcount = postData.count;
    this.booksUpdated.next({BOOKS: [...this.book], count: this.bookcount});

  });
}
getBooksUpdateListener() {
  return this.booksUpdated.asObservable();
}
getToIssueBooksUpdateListener() {
  return this.toIssuebooksUpdated.asObservable();
}
DeleteUser(userid: string) {
  return this.http.delete('http://localhost:3000/api/users/' + userid );

}
onDeleteBook(bookid: string) {
  return this.http.delete('http://localhost:3000/api/books/' + bookid);
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
  this.usersUpdated.next({LibCard: [...this.libCard ], count: this.count });

});
}

getLastUser() {
  this.http.get<{ message: string, users: Libcard[]}>('http://localhost:3000/api/users/last')
 .subscribe((postData) => {
this.libCard = postData.users;
this.usersUpdated.next({LibCard: [...this.libCard ], count: this.count });
 });
}
getUser(cardNo: number) {
  this.http.get<{ message: string , user: Libcard[] , books: Books[]}>('http://localhost:3000/api/users/issue/' + cardNo )
  .subscribe((response) => {
    this.libCard = response.user;
    this.book = response.books;
    this.usersUpdated.next({LibCard: [...this.libCard ], count: this.count });
    this.booksUpdated.next({BOOKS: [...this.book], count: this.bookcount});
  });
}

getBook(accessionNo: number) {
return this.http.get<{message: string , book: Books[]}>('http://localhost:3000/api/books/' + accessionNo);
}

issueBook(book: Books) {
 return this.http.put<{message: string}>('http://localhost:3000/api/books/issueOne/' + book._id , book);
}
resetbooks() {
  this.book = [];
  this.booksUpdated.next({BOOKS: [...this.book] , count: this.bookcount});
}
resetuser() {
  this.libCard = [];
  this.usersUpdated.next({LibCard: [...this.libCard ], count: this.count });
}


getBooksForDelete(cardNo: number) {
  return this.http.get<{ message: string , books: Books[]}>('http://localhost:3000/api/books/records/' + cardNo );
}


getAllIssuedBooks(pagesize: number , page: number) {
  const queryParams = `?pagesize=${pagesize}&page=${page}`;
  this.http.get<{ message: string, books: Books[] , count: number}>('http://localhost:3000/api/books/issuedbooks' + queryParams)
  .subscribe((postData) => {

    this.book = postData.books;
    this.bookcount = postData.count;
    this.booksUpdated.next({BOOKS: [...this.book], count: this.bookcount});

  });
}


receiveOne(book: Books) {
  return this.http.put<{message: string}>('http://localhost:3000/api/books/receiveOne/' + book._id , book);
}

UpdateRecReg(toRecBook: ReceiveReg) {
 return this.http.post<{ message: string}>('http://localhost:3000/api/receive' , toRecBook);
}

getAllRecRegBooks(pagesize: number , page: number) {
  const queryParams = `?pagesize=${pagesize}&page=${page}`;
  return this.http.get<{ message: string, books: ReceiveReg[] , count: number}>('http://localhost:3000/api/receive' + queryParams);
}

}
