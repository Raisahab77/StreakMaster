import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StreakComponent } from '../streak/streak.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastComponent } from 'src/app/component/toast/toast.component';


@Component({
  selector: 'app-streak-detail',
  templateUrl: './streak-detail.component.html',
  styleUrls: ['./streak-detail.component.scss']
})
export class StreakDetailComponent implements OnInit, AfterViewInit {

  @ViewChild ('streak_name') streakName!: ElementRef;
  constructor(private _route:ActivatedRoute,
              private _toast:ToastComponent) {
  }

  
  db:any;
  streakData : any;
  currentDate:any;

  ngOnInit(): void {
    let id:any;
    this._route.params.subscribe((params:any) => {
      id =  params['id'];
    });
    
    this.getStreakByID(id);

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    this.currentDate = `${day}-${month}-${year}`;

  }

  ngAfterViewInit(): void {
    
  }

  // createProgress(){
  //   const container:any = document.querySelector(".container");

  //   const courses = [
  //     { course: "HTML", percent: 9, color: "#f9ca24" },
  //     { course: "CSS", percent: 65, color: "#78e08f" },
  //     { course: "JavaScript", percent: 35, color: "#c56cf0" },
  //     { course: "Bootstrap", percent: 85, color: "#badc58" },
  //   ];

  //   // courses.forEach((course) => {
  //   //   container.innerHTML += `
  //   //   <div class="progess-group">
  //   //   <div class="circular-progress" >
  //   //     <span class="course-value" style="color:${course.color}">0%</span>
  //   //   </div>
  //   //   <label class="text" style="color:${course.color}">${course.course}</label>
  //   // </div>
  //   //   `;
  //   // });

  //   //style="  background: conic-gradient(${course.color} ${3.6 * course.percent}deg, #fff 0deg);"

  //   const progressGroups = document.querySelectorAll(".progess-group");

  //   progressGroups.forEach((progress:any, index) => {
  //     let progressStartValue = 0;
  //     let progressStartEnd = courses[index].percent;
  //     let speed = 50;
  //     let progessTimer = setInterval(() => {
  //       progressStartValue++;
  //       if (progressStartValue == progressStartEnd) {
  //         clearInterval(progessTimer);
  //       }
  //       progress.querySelector(".circular-progress").style.background = `
  //       conic-gradient(${courses[index].color} ${3.6 * progressStartValue}deg, #fff 0deg)`;

  //       progress.querySelector(".course-value").innerHTML = progressStartValue + "%";
  //     }, speed);
  //   });
  // }

  createStreak(score:number,strekType:string,goal:number){
    const progress:any = document.querySelector(".progess-group");
    let progressStartValue = 0;
      let progressStartEnd = score;
      let speed = 50;
      let progessTimer = setInterval(() => {
        if (progressStartValue >= progressStartEnd) {
          clearInterval(progessTimer);
        }
        if(strekType=='finite'){
          if(progressStartValue<progressStartEnd) progressStartValue++;
          progress.querySelector(".circular-progress").style.background = `
          conic-gradient(${'#1fdf64'} ${360/goal * progressStartValue}deg, #fff 0deg)`;
        }else{
          progressStartValue++;
          progress.querySelector(".circular-progress").style.background = `
          conic-gradient(${'#1fdf64'} ${360 * progressStartValue}deg, #fff 0deg)`;
        }

        progress.querySelector(".course-value").innerHTML = progressStartValue;
      }, speed);
  }

  resetStreak(id:string){
    console.log("Reset Streak!!!");
    const objectStore = this.db.transaction('streak','readwrite')
                          .objectStore('streak');

    const request = objectStore.get(id);

    request.onsuccess = ()=> {

        const streak = request.result;

        // Change the name property
        streak.last_mark_date = '';
        streak.strek_start_dt = this.currentDate;
        streak.current_score = 0;

        // Create a request to update
        const updateRequest = objectStore.put(streak);
        // const updateRequest = objectStore.update(todo);

        this.streakData = streak;
        this.createStreak(this.streakData.current_score,this.streakData.streak_type,this.streakData.goal);
    }
  }

  // to check If browser supports indexDB or not

  indexedDBSupport(){
    return 'indexedDB' in window;
  }

  createDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.indexedDBSupport()) reject(new Error("Your browser doesn't support IndexedDB"));
  
      const request = window.indexedDB.open('Streak', 1);
  
      // Event handling
      request.onerror = (e) => {
        console.error(`IndexedDB error`);
        reject(new Error('IndexedDB error'));
      };
  
      request.onsuccess = (e) => {
        console.info('Successful database connection');
        this.db = request.result;
        console.log(`value of db ${this.db}`);
        resolve(); // Resolve the promise when the database connection is successful
      };
  
      request.onupgradeneeded = (e) => {
        console.info('Database created');
  
        const db = request.result;
  
        const objectStore = db.createObjectStore('streak', { keyPath: 'id' });
  
        // Ensure any necessary modifications or setups are done here
      };
    });
  }

  completeDailyStreak(id:string){
    console.log("Not disabled!!");
    const objectStore = this.db.transaction('streak','readwrite')
                          .objectStore('streak');

    const request = objectStore.get(id);

    request.onsuccess = ()=> {

        const streak = request.result;

        // Change the name property
        streak.last_mark_date = this.currentDate;
        streak.current_score += 1 ;

        if(streak.current_score > streak.high_score) streak.high_score = streak.current_score;

        // Create a request to update
        const updateRequest = objectStore.put(streak);
        this.streakData = streak;
        this.createStreak(this.streakData.current_score,this.streakData.streak_type,this.streakData.goal);
    }
  }

  // deleteTodo(id:string){
  //   let index = this.findElementIndex(this.todos,id);
  //   this.todos.splice(index,1);
  //   const request = this.db.transaction('todos', 'readwrite')
  //                     .objectStore('todos')
  //                     .delete(id);

  //   request.onsuccess = ()=> {
  //       console.log(`Todo deleted`);
  //   }

  //   request.onerror = (err:any)=> {
  //       console.error(`Error in deleting todo`)
  //   }
  // }

  // async getAllTodos(){
  //   await this.createDatabase();
  //   console.log("should be after db value");
  //   const request = this.db.transaction('todos')
  //                  .objectStore('todos')
  //                  .getAll();

  //   request.onsuccess = ()=> {
  //       this.todos = request.result;
  //       console.log(this.todos);
  //   }

  //   request.onerror = (err:any)=> {
  //       console.error(`Error to get student information: ${err}`)
  //   }
  // }

  async getStreakByID(id:string){
    await this.createDatabase();
    console.log("should be after db value");
    const request = this.db.transaction('streak')
                   .objectStore('streak')
                   .get(id);

    request.onsuccess = ()=> {
        this.streakData = request.result;
        console.log(this.streakData);
        this.createStreak(this.streakData.current_score,this.streakData.streak_type,this.streakData.goal);
    }

    request.onerror = (err:any)=> {
        console.error(`Error to get student information: ${err}`)
    }
  }


}
