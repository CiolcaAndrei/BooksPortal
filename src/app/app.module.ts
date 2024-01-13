import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { BookTemplateComponent } from './components/book-template/book-template.component';
import { BookAddComponent } from './components/book-add/book-add.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BookViewerComponent } from './components/book-viewer/book-viewer.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BookEditPageComponent } from './components/book-edit-page/book-edit-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';

@NgModule({
  declarations: [
    AppComponent,
    BookTemplateComponent,
    BookAddComponent,
    BookViewerComponent,
    BookEditPageComponent,
    DialogBoxComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    NgSelectModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
