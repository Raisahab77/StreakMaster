import { NgModule } from "@angular/core"; 
import { RouterModule, Routes } from "@angular/router"; 
import { TodosComponent } from "./todos/todos.component";
import { StreakComponent } from "./streak/streak.component";
import { PagesComponent } from "./pages.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { StreakDetailComponent } from './streak-detail/streak-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddStreakPopupComponent } from "../component/add-streak-popup/add-streak-popup.component";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { HeaderComponent } from "../component/header/header.component";
  
const routes: Routes = [ 
  { path: "",
    component:PagesComponent,
      children:[
          {path:"",component: TodosComponent},
          {path:"streak", component:StreakComponent},
          {path:"streak-dtl/:id",component:StreakDetailComponent}
        ]
  }, 
]; 
  
@NgModule({ 
  declarations: [
    TodosComponent,
    StreakDetailComponent,
    AddStreakPopupComponent,
    HeaderComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatSlideToggleModule
  ], 
  exports: [RouterModule], 
}) 
export class PageRoutingModule {}