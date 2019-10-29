import { NgModule } from '@angular/core';
import { LayDashboardComponent } from './dashboard/lay-dashboard/lay-dashboard.component';
import { LayComponent } from './new-book-entry/lay/lay.component';
import { IssueLayComponent } from './issue-book/issue-lay/issue-lay.component';
import { ReceiveLayComponent } from './receive-book/receive-lay/receive-lay.component';
import { LayIssueRegComponent } from './issue-register/lay-issue-reg/lay-issue-reg.component';
import { LayBooklistComponent } from './book-list/lay-booklist/lay-booklist.component';
import { Routes , RouterModule } from '@angular/router';
import { RecRegLayComponent } from './receive-register/rec-reg-lay/rec-reg-lay.component';
import { LibRegLayComponent } from './lib-card-reg/lib-reg-lay/lib-reg-lay.component';
import { NewCardLayComponent } from './new-lib-card/new-card-lay/new-card-lay.component';
import { BarcodeComponent } from './barcode/barcode.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LogincompComponent } from './logincomp/logincomp.component';




const appRoutes: Routes = [

  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: LayDashboardComponent  },
  { path: 'new-book-entry', component: LayComponent },
  { path: 'issue-book', component: IssueLayComponent },
  { path: 'receive-book', component: ReceiveLayComponent },
  { path: 'issue-reg', component: LayIssueRegComponent },
  { path: 'receive-reg', component: RecRegLayComponent  },
  { path: 'book-list', component: LayBooklistComponent  },
  { path: 'lib-card-list', component: LibRegLayComponent   },
  { path: 'new-lib-card', component: NewCardLayComponent  },
  { path: 'barcodes', component: BarcodeComponent  },
  { path: 'login' , component: LogincompComponent},
 { path: 'page-not-found', component: PageNotFoundComponent  },
 { path: '**', redirectTo: '/page-not-found' },
];
@NgModule({
imports: [
  RouterModule.forRoot(appRoutes , {useHash: true})],
exports: [RouterModule]
  })
  export class AppRoutingModule {

  }
