import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { LandingComponent } from './pages/landing/landing.component';
import { TodosCardComponent } from './component/todos-card/todos-card.component';
import { AddTodoComponent } from './pages/add-todo/add-todo.component';
import { MenuComponent } from './component/menu/menu.component';
import { StreakComponent } from './pages/streak/streak.component';
import { PagesComponent } from './pages/pages.component';
import { PageRoutingModule } from './pages/pages.module';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './component/toast/toast.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    TodosCardComponent,
    AddTodoComponent,
    MenuComponent,
    StreakComponent,
    PagesComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    PageRoutingModule,
    MatSlideToggleModule,
    FormsModule
  ],
  providers: [ToastComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
