import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgxBarcodeModule } from 'ngx-barcode';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewBookEntryComponent } from './new-book-entry/new-book-entry.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayDashboardComponent } from './dashboard/lay-dashboard/lay-dashboard.component';
import { LayComponent } from './new-book-entry/lay/lay.component';
import { IssueBookComponent  } from './issue-book/issue-book.component';
import { IssueLayComponent } from './issue-book/issue-lay/issue-lay.component';
import { ReceiveBookComponent } from './receive-book/receive-book.component';
import { ReceiveLayComponent } from './receive-book/receive-lay/receive-lay.component';
import { IssueRegisterComponent } from './issue-register/issue-register.component';
import { LayIssueRegComponent } from './issue-register/lay-issue-reg/lay-issue-reg.component';
import { ReceiveRegisterComponent } from './receive-register/receive-register.component';
import { RecRegLayComponent } from './receive-register/rec-reg-lay/rec-reg-lay.component';
import { BookListComponent } from './book-list/book-list.component';
import { LayBooklistComponent } from './book-list/lay-booklist/lay-booklist.component';
import { LibCardRegComponent } from './lib-card-reg/lib-card-reg.component';
import { LibRegLayComponent } from './lib-card-reg/lib-reg-lay/lib-reg-lay.component';
import { NewLibCardComponent } from './new-lib-card/new-lib-card.component';
import { NewCardLayComponent } from './new-lib-card/new-card-lay/new-card-lay.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BarcodeComponent } from './barcode/barcode.component';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    NewBookEntryComponent,
    DashboardComponent,
    LayDashboardComponent,
    LayComponent,
    IssueBookComponent,
    IssueLayComponent,
    ReceiveBookComponent,
    ReceiveLayComponent,
    LayIssueRegComponent,
    IssueRegisterComponent,
    ReceiveRegisterComponent,
    RecRegLayComponent,
    BookListComponent,
    LayBooklistComponent,
    LibCardRegComponent,
    LibRegLayComponent,
    NewLibCardComponent,
    NewCardLayComponent,
    PageNotFoundComponent,
    BarcodeComponent,

    
  
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AppRoutingModule,
    NgxBarcodeModule,
    
    
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
