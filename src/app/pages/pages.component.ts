import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor() {

    document.addEventListener("click", function(event:any) {
      if (event.target.id == ('setting' || 'setting-div')) {
        document.getElementById("setting-div")!.style.display = "block";
      }else{
        document.getElementById("setting-div")!.style.display = "none";
      }
    });

  }
  isSettingOpend = true;
  checked = false;
  ngOnInit(): void {
    if(localStorage.getItem('theme')=='dark') this.checked = true;
  }

  changeTheme(){
    console.log("In change theme");
    document.body.classList.toggle('dark');
    if(document.body.classList.contains('dark')){
      localStorage.setItem('theme','dark');
    }
    else{
      localStorage.setItem('theme','light');
    }
  }

  openSetting(){
    console.log(this.isSettingOpend);
    this.isSettingOpend = !this.isSettingOpend;
  }

}
