import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as uuid from 'uuid';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-add-streak-popup',
  templateUrl: './add-streak-popup.component.html',
  styleUrls: ['./add-streak-popup.component.scss']
})
export class AddStreakPopupComponent implements OnInit {

  constructor(private _fb: FormBuilder,
              private dialogRef: MatDialogRef<AddStreakPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any,
              private _toast:ToastComponent
              ) {
    this.streakForm = this._fb.group({
      streak_name : new FormControl('',Validators.required),
      streak_type : new FormControl('',Validators.required), 
      goal : new FormControl('', [
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(4),
      ]), 
    });
   }

   db = this.data;
   streakForm:any;
   isStrekDurVsbl = true;

  ngOnInit(): void {
  }

  onSubmit(){
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year}`;

    let streak_data = this.streakForm.value;
    streak_data.id = uuid.v4();
    streak_data.current_score = 0;
    streak_data.high_score = 0;
    streak_data.strek_start_dt = currentDate;
    streak_data.last_mark_date = '';

    this.addNewStreak(streak_data);
    console.log(streak_data);
  }

  dispalyStreakDur(event:any){
    console.log(event);
    if(event.target.value=='finite') this.isStrekDurVsbl = false;
    else this.isStrekDurVsbl = true;
  }

  addNewStreak(streak_data:any){
    const transaction = this.db.transaction('streak', 'readwrite');

    const objectStore = transaction.objectStore('streak');
    // Add new Todo
    const request = objectStore.add(streak_data);

    request.onsuccess = ()=> {
        console.log(`New Streak added`);
        // this.todo = '';
        this.dialogRef.close();
        this._toast.displayToast('success','Streak Added Successfully!');
    }

    request.onerror = (err:any)=> {
        console.error(`Error in adding Streak`);
    }

  }
}
