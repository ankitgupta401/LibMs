import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Books } from './books.model';
import { Libcard } from './Libcard.model';
import { Subject } from 'rxjs';
import { ReceiveReg } from './receiveReg.model';
import { Email } from './email.model';

import { environment } from '../environments/environment';
const URL = environment.BACKEND_URL;
@Injectable()
export class All {
 book: Books[] = [];
  libCard: Libcard[] = [];
 toIssue: Books[] = [];
private usersUpdated = new Subject<{LibCard: Libcard[], count: number}>();
private booksUpdated = new Subject<{BOOKS: Books[], count: number}>();
private toIssuebooksUpdated = new Subject<Books[]>();
  requiredBook: string;


constructor(private http: HttpClient) {}
count: number;
bookcount: number;
addLibCard(LibCard: Libcard , image: File) {
  const UserData = new FormData();
  UserData.append('cardNo', LibCard.cardNo);
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
  this.http.post<{message: string}>(URL + 'users', UserData)
  .subscribe((responseData => {


    this.libCard.push(LibCard);
    this.usersUpdated.next({LibCard: [...this.libCard ], count: this.count });
  }));
}
getUsers(pagesize: number , page: number , dept: string ) {
const queryParams = `?pagesize=${pagesize}&page=${page}&dept=${dept}`;
this.http.get<{ message: string, users: Libcard[], count: number}>(URL + 'users' + queryParams)
 .subscribe((postData) => {
this.libCard = postData.users;
this.count = postData.count;
this.usersUpdated.next({LibCard: [...this.libCard ], count: this.count });
 });
}
getUsersUpdateListener() {
  return this.usersUpdated.asObservable();
}

sendEmail(emails: string, contents: string) {
const emailContent: Email = {
  email: emails,
  content: contents
};

return this.http.post<{ message: string}>(URL + 'email' , emailContent);
}


addBooks(book: Books, accession: {_id: string, accession_no: number}[]) {

  this.http.post<{ message: string}>(URL + 'books', book)
  .subscribe(( responseData) => {

    this.book.push(book);
    accession[0].accession_no = book.accession_no + 1;
    this.updateAcccession(accession)
    .subscribe(result => {
      this.booksUpdated.next({BOOKS: [...this.book], count: this.bookcount});
    });
  });

}

getBooks(pagesize: number , page: number) {
  const queryParams = `?pagesize=${pagesize}&page=${page}`;
  this.http.get<{ message: string, books: Books[] , count: {count: number}[]}>(URL + 'books' + queryParams)
  .subscribe((postData) => {

if (postData.books.length > 0) {
  this.book = postData.books;
  this.bookcount = postData.count[0].count;
}

if (this.bookcount === 0) {
      this.booksUpdated.next({BOOKS: [], count: 0});
    } else {
      this.booksUpdated.next({BOOKS: [...this.book], count: this.bookcount});
    }

  });
}
getRequiredIsbn(isbn: string) {
  this.requiredBook = isbn;

}
getBooksAll(pagesize: number , page: number, requiredBook: string) {
  let queryParams = `?pagesize=${pagesize}&page=${page}&book=${this.requiredBook}`;
  if (!requiredBook) {
    queryParams = `?pagesize=${pagesize}&page=${page}&book=${requiredBook}`;
  }

  this.http.get<{ message: string, books: Books[] , count: number}>(URL + 'books/BooksAll' + queryParams)
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
DeleteUser(card: Libcard) {
  return this.http.put( URL + 'users/deleteOne/' + card._id , card);

}
resetRequired() {
  this.requiredBook = undefined;
}
onDeleteBook(book: Books) {
  return this.http.put(URL + 'books/deleteOne/' + book._id , book);
}
getCard(id: string) {
  return {...this.libCard.find(c => c._id === id)};
}
updateUser(card: Libcard) {

  this.http.put(URL + 'users/' + card._id , card)
.subscribe((response) => {
  this.http.get<{message: string , book: Books[]}>(URL + 'books/getByCardNo/' + card.cardNo)
  .subscribe(postData => {
    if (postData.book.length > 0) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < postData.book.length; i++ ) {
      postData.book[i].borrower_email = card.email;
      this.http.post<{message: string}>(URL + 'books/updateEmail/' , postData.book[i])
      .subscribe((postData2) => {
      });
      }
      const updatedusers = [...this.libCard];
      const oldPostIndex = updatedusers.findIndex(u => u._id === card._id);
      updatedusers[oldPostIndex] = card;
      this.libCard = updatedusers;
      this.usersUpdated.next({LibCard: [...this.libCard ], count: this.count });
    } else {
      const updatedusers = [...this.libCard];
      const oldPostIndex = updatedusers.findIndex(u => u._id === card._id);
      updatedusers[oldPostIndex] = card;
      this.libCard = updatedusers;
      this.usersUpdated.next({LibCard: [...this.libCard ], count: this.count });
    }
  });

});
}

getLastUser() {
  this.http.get<{ message: string, users: Libcard[]}>(URL + 'users/last')
 .subscribe((postData) => {
this.libCard = postData.users;
this.usersUpdated.next({LibCard: [...this.libCard ], count: this.count });
 });
}
getUser(cardNo: string) {
  this.http.get<{ message: string , user: Libcard[] , books: Books[]}>(URL + 'users/issue/' + cardNo )
  .subscribe((response) => {
    if (response.user.length === 0) {
      this.libCard = response.user;
      this.book = response.books;
      this.usersUpdated.next({LibCard: [...this.libCard ], count: this.count });
      this.booksUpdated.next({BOOKS: [...this.book], count: this.bookcount});
      return alert('Invalid User');
    }
    this.libCard = response.user;
    this.book = response.books;
    this.usersUpdated.next({LibCard: [...this.libCard ], count: this.count });
    this.booksUpdated.next({BOOKS: [...this.book], count: this.bookcount});
  });
}

getBook(accessionNo: number) {
return this.http.get<{message: string , book: Books[]}>(URL + 'books/' + accessionNo);
}

issueBook(book: Books) {
 return this.http.put<{message: string}>(URL + 'books/issueOne/' + book._id , book);
}
resetbooks() {
  this.book = [];
  this.booksUpdated.next({BOOKS: [...this.book] , count: this.bookcount});
}
resetuser() {
  this.libCard = [];
  this.usersUpdated.next({LibCard: [...this.libCard ], count: this.count });
}


getBooksForDelete(cardNo: string) {
  return this.http.get<{ message: string , books: Books[]}>(URL + 'books/records/' + cardNo );
}


getAllIssuedBooks(pagesize: number , page: number , dept: string) {

const queryParams = `?pagesize=${pagesize}&page=${page}&dept=${dept}`;
this.http.get<{ message: string, books: Books[] , count: number}>(URL + 'books/issuedbooks' + queryParams)
  .subscribe((postData) => {
    this.book = postData.books;
    this.bookcount = postData.count;
    this.booksUpdated.next({BOOKS: [...this.book], count: this.bookcount});

  });
}


receiveOne(book: Books) {
  return this.http.put<{message: string}>(URL + 'books/receiveOne/' + book._id , book);
}

UpdateRecReg(toRecBook: ReceiveReg) {
 return this.http.post<{ message: string}>(URL + 'receive' , toRecBook);
}

getAllRecRegBooks(pagesize: number , page: number, dept: string) {
  const queryParams = `?pagesize=${pagesize}&page=${page}&dept=${dept}`;
  return this.http.get<{ message: string, books: ReceiveReg[] , count: number}>(URL + 'receive' + queryParams);
}

findbookAcc( accessionNo: number) {
this.http.get<{message: string , book: Books[], count: number}>(URL + 'books/' + accessionNo)
.subscribe((result) => {
  this.book = result.book;

  if ( result.book.length > 0) {
    this.booksUpdated.next({BOOKS: [...this.book], count: result.book.length});
  } else {
    this.booksUpdated.next({BOOKS: [...this.book], count: 1});
  }


});
}
findallbookAcc( accessionNo: number) {
  this.http.get<{message: string , books: Books[], count: number}>(URL + 'books/all/' + accessionNo)
  .subscribe((result) => {
    this.book = result.books;
    this.booksUpdated.next({BOOKS: [...this.book], count: result.count});
  });
  }

  findallbookAcc3( accessionNo: number) {
   return this.http.get<{message: string , books: Books[], count: number}>(URL + 'books/all/' + accessionNo);
    }

findbookCard(pagesize: number , page: number , cardNo: string) {
  const queryParams = `?pagesize=${pagesize}&page=${page}&cardNo=${cardNo}`;
  this.http.get<{message: string , books: Books[], count: number}>(URL + 'books/getbycard' + queryParams)
  .subscribe((result) => {
    this.book = result.books;

    this.booksUpdated.next({BOOKS: [...this.book], count: result.count});

  });

}


findbookTitle(pagesize: number , page: number , title: string) {
  const queryParams = `?pagesize=${pagesize}&page=${page}&title=${title}`;
  this.http.get<{message: string , books: Books[], count: {count: number}[]}>(URL + 'books/getbytitle' + queryParams)
  .subscribe((result) => {

    this.book = result.books;
    let counts = 0;
    if (this.book.length > 0) {
counts = result.count[0].count;
}
    this.booksUpdated.next({BOOKS: [...this.book], count: counts});

  });
}
findbookTitle2(pagesize: number , page: number , title: string) {
  const queryParams = `?pagesize=${pagesize}&page=${page}&title=${title}`;
  this.http.get<{message: string , books: Books[], count: {count: number}[]}>(URL + 'books/getbytitle2' + queryParams)
  .subscribe((result) => {
let counts = 0;
this.book = result.books;
if (result.books.length > 0 ) {
    counts = result.count[0].count;
    }
this.booksUpdated.next({BOOKS: [...this.book], count: counts});

  });
}
findbookAuthor(pagesize: number , page: number , author: string) {
  const queryParams = `?pagesize=${pagesize}&page=${page}&author=${author}`;
  this.http.get < {message: string , books: Books[], count: {count: number}[]} > (URL + 'books/getbyauthor' + queryParams)
  .subscribe((result) => {
    this.book = result.books;
    let counts = 0;

    if (this.book.length > 0) {
counts = result.count[0].count;
}
    this.booksUpdated.next({BOOKS: [...this.book], count: counts });

  });
}
findbookAuthor2(pagesize: number , page: number , author: string) {
  const queryParams = `?pagesize=${pagesize}&page=${page}&author=${author}`;

  this.http.get<{message: string , books: Books[], count: {count: number}[]}>(URL + 'books/getbyauthor2' + queryParams)
  .subscribe((result) => {
    this.book = result.books;
    let counts = 0;
    if (result.books.length > 0) {
  counts = result.count[0].count;
}
    this.booksUpdated.next({BOOKS: [...this.book], count: counts});

  });
}

findallrecregAcc(pagesize: number , page: number , accessionNo: number) {
  const queryParams = `?pagesize=${pagesize}&page=${page}&accessionNo=${accessionNo}`;
  return this.http.get<{message: string , books: ReceiveReg[], count: number}>(URL + 'receive/all/' + queryParams);
  }

  findallrecregCard(pagesize: number , page: number , cardNo: string) {
  const queryParams = `?pagesize=${pagesize}&page=${page}&cardNo=${cardNo}`;
  return this.http.get<{message: string , books: ReceiveReg[], count: number}>(URL + 'receive/getbycard' + queryParams);
}

findUserEmail(pagesize: number , page: number , email: string) {
  const queryParams = `?pagesize=${pagesize}&page=${page}&email=${email}`;
  this.http.get<{message: string , users: Libcard[], count: number}>(URL + 'users/email' + queryParams)
  .subscribe((result) => {
    this.libCard = result.users;
    this.usersUpdated.next({LibCard: [...this.libCard ], count: result.count});

  });
}

findUserPhone(phoneNo: any) {
  this.http.get<{ message: string , user: Libcard[] }>(URL + 'users/get/' + phoneNo )
  .subscribe((response) => {
    this.libCard = response.user;
    this.usersUpdated.next({LibCard: [...this.libCard ], count: 1 });
  });
}

searchByIsbn(isbn: string) {
  return this.http.get<{ message: string , books: Books[] }>(URL + 'books/get/' + isbn );
}

findallbookAcc2( accessionNo: number) {
 return this.http.get<{message: string , books: Books[]}>(URL + 'books/all/' + accessionNo);
  }

getlastTeacher() {
return this.http.get<{message: string , libcard: Libcard[]}>(URL + 'users/getTeacher');
}


findUserPhoneNo(phoneNo: any) {
  return this.http.get<{ message: string , user: Libcard[] }>(URL + 'users/get/' + phoneNo );

}

findUserEmails(email: string) {
  return this.http.get<{message: string , user: Libcard[], count: number}>(URL + 'users/Email/' + email);
}
findUserCard(cardNo: string) {
  return this.http.get<{message: string, user: Libcard[] }>(URL + 'users/Card/' + cardNo);
}
verifyAdminPass(pass: string) {
return this.http.get<{message: string, valid: boolean}>(URL + 'admin/get/' + pass);
}

changePass(pass: string) {
return this.http.get<{message: string}>(URL + 'admin/change/' + pass);
}
changeEmail(changes: any) {
return this.http.post<{message: string}>(URL + 'admin/emailChange', changes);
}

getTodayReport() {
  return this.http.get<{message: string, issueData: number , receiveData: number}>(URL + 'receive/IssueDataToday');
}
getThisWeek() {
  return this.http.get<{message: string, issueData: number , receiveData: number}>(URL + 'receive/ThisWeek');
 }

getLastWeek() {
  return this.http.get<{message: string, issueData: number, receiveData: number}>(URL + 'receive/lastWeek');
}
getThisMonth() {
  return this.http.get<{message: string, issueData: number, receiveData: number}>(URL + 'receive/thisMonth');
}
getLastMonth() {
  return this.http.get<{message: string, issueData: number, receiveData: number}>(URL + 'receive/lastMonth');
}
getThisYear() {
  return this.http.get<{message: string, issueData: number, receiveData: number}>(URL + 'receive/thisYear');
}
getLastYearThisMonth() {
  return this.http.get<{message: string, issueData: number, receiveData: number}>(URL + 'receive/LastYeatThisMonth');
}

getAvailable(isbn: string) {
  const queryParams = `?isbn=${isbn}`;

  return this.http.get<{message: string, available: any}>(URL + 'books/Available' + queryParams);

}

saveAcccession() {
  const accession = 1000;
  this.http.get<{message: string}>(URL + 'books/SaveAccession/' + accession)
  .subscribe(result => {
  });
}
getAcccession() {

 return this.http.get<{message: string, accession: any[]}>(URL + 'books/getAccession/' );

}
updateAcccession(accession: {_id: string, accession_no: number}[]) {
 return  this.http.post<{message: string}>(URL + 'books/UpdateAccession' , accession[0]);
}
}

