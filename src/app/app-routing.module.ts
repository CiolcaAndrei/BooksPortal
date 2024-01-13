import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookAddComponent } from './components/book-add/book-add.component';
import { BookViewerComponent } from './components/book-viewer/book-viewer.component';
import { BookEditPageComponent } from './components/book-edit-page/book-edit-page.component';

const routes: Routes = [
  { path: 'add-book-component', component: BookAddComponent },
  { path: 'book-viewer', component: BookViewerComponent},
  { path: '',   redirectTo: '/book-viewer', pathMatch: 'full' },
  { path: 'edit-book-component/:id', component: BookEditPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
