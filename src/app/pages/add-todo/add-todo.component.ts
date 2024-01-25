import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  boldText(){
    let element = document.getElementsByClassName('text-box');
    element[0].classList.toggle('font-bold');
    console.log(element);
  }

}
