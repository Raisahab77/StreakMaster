import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStreakPopupComponent } from 'src/app/component/add-streak-popup/add-streak-popup.component';
import { ToastComponent } from 'src/app/component/toast/toast.component';

@Component({
  selector: 'app-streak',
  templateUrl: './streak.component.html',
  styleUrls: ['./streak.component.scss']
})
export class StreakComponent implements OnInit {

  constructor(public dialogRef: MatDialog) { }
  streakData:any = [];

  ngOnInit(): void {
    this.getAllStreak();
  }

  indexedDBSupport(){
    return 'indexedDB' in window;
  }

  db:any;

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
  
  async getAllStreak(){
    await this.createDatabase();
    console.log("should be after db value");
    const request = this.db.transaction('streak')
                   .objectStore('streak')
                   .getAll();

    request.onsuccess = ()=> {
        this.streakData = request.result;
        console.log(this.streakData);
    }

    request.onerror = (err:any)=> {
        console.error(`Error to get student information: ${err}`)
    }
  }

  addStreakPopup(){
    const dialogRef = this.dialogRef.open(AddStreakPopupComponent,{
      height:'300px',
      width:'350px',
      data:this.db,
      panelClass:'custom-dialog-container',          //created this is globle css file to remove popup padding and scroll bar
      autoFocus:false
    });

    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);
      this.getAllStreak();
    })
  }

  findElementIndex(arr:Array<any>,id:string){
    for(let i=0;i<arr.length;i++){
      if(arr[i].id == id){
          return i;
      }
    }
    return -1;
  }

  deleteStreak(id:string){
    let index = this.findElementIndex(this.streakData,id);
    this.streakData.splice(index,1);
    const request = this.db.transaction('streak', 'readwrite')
                      .objectStore('streak')
                      .delete(id);

    request.onsuccess = ()=> {
        console.log(`Todo deleted`);
    }

    request.onerror = (err:any)=> {
        console.error(`Error in deleting todo`)
    }
  }

}
