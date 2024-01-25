import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("Toast component");
  }

  displayToast(type: string, message: string) {
    const toastBox = document.getElementById('toast-box');
    const toast = document.createElement('div');

    if (type == 'success') {
      toast.innerHTML = `<i class="fa-solid fa-circle-check"></i>
              <span>${message}</span>`;
      toast.classList.add('success');
    } else if (type == 'error') {
      toast.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>
              <span>${message}</span>`;
      toast.classList.add('error');
    } else if (type == 'warning') {
      toast.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i>
              <span>${message}</span>`;
      toast.classList.add('warning');
    }
    toast.classList.add('toast');
    toastBox!.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 5000);
  }
}
