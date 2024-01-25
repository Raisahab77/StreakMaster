import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { AddTodoComponent } from './pages/add-todo/add-todo.component';

const routes: Routes = [
  {path:'', loadChildren:()=>import('./pages/pages.module').then(m=>m.PageRoutingModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
