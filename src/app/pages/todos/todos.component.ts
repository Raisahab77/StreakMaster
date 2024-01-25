import { Component, OnInit } from '@angular/core';
import { ToastComponent } from 'src/app/component/toast/toast.component';
import * as uuid from 'uuid';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  constructor(private _toast:ToastComponent) { 
    window.addEventListener("keypress",(event)=>{
      if(event.key=='Enter' && this.todo!=''){
        this.addTodo();
      }
    })
  }

  todos:any;
  todo:string = '';
  
  ngOnInit(): void {
    this.getAllTodos();
  }

  // addTodo(){
  //   // let request:any = this.connectIndexedDB();
  //   const id = uuid.v4();
  //   let todo = {
  //     id:id,
  //     status:'pending',
  //     todo:this.todo
  //   }

  //   // let idb = window.indexedDB.open("notes",1);
  //   const idb = indexedDB.open("notes",1);
  //   idb.onupgradeneeded = () =>{
  //     let res = idb.result;
  //     res.createObjectStore('todos',{keyPath:'id'});
  //   }

  //   idb.onsuccess = () =>{
  //     let res = idb.result;
  //     let tx = res.transaction('todos','readwrite');
  //     let store = tx.objectStore('todos');
  //     store.put(todo);
  //   }

  //   this.todos.unshift(todo);

  //   // request.onupgradeneeded = (event:any) => {
  //   //   const db = event.target.result;

  //   //   const objectStore = db.createObjectStore("todos", {keyPath: "id"});

  //   //   objectStore.transaction.oncomplete = (event:any) => {
  //   //     // Store values in the newly created objectStore.
  //   //     const todoObjectStore = db
  //   //       .transaction("todos", "readwrite")
  //   //       .objectStore("todos");
  //   //       todoObjectStore.add(todo);
  //   //       // console.log("Todo added!!");
  //   //       this.todos.forEach((todo) => {
  //   //         todoObjectStore.add(todo);
  //   //       });
  //   //   };
  //   // };
  // }

  // getTodos(){
  //   const request = db.transaction('students')
  //                  .objectStore('students')
  //                  .getAll();

  //   request.onsuccess = ()=> {
  //       const students = request.result;

  //       console.log('Got all the students');
  //       console.table(students)

  //       return students;
  //   }

  //   request.onerror = (err)=> {
  //       console.error(`Error to get all students: ${err}`)
  //   }
  // }

  // markTaskCompleted(id:string){
  //   let index = this.findElementIndex(this.todos,id);
  //   this.todos[index].status = 'completed';
  // }

  // deleteTodo(id:string){
  //   let index = this.findElementIndex(this.todos,id);
  //   this.todos.splice(index,1);
  // }

  findElementIndex(arr:Array<any>,id:string){
    for(let i=0;i<arr.length;i++){
      if(arr[i].id == id){
          return i;
      }
    }
    return -1;
  }

  // connectIndexedDb(){
  //   const indexedDB =
  //     window.indexedDB;

  //   if (!indexedDB) {
  //     console.log("IndexedDB could not be found in this browser.");
  //   }

  //   // 2
  //   const request = indexedDB.open("CarsDatabase", 1);

  //   let index:any;
  //   // indexedDB.onerror = function(event){
  //   //   console.error(event);
  //   // }

  //   request.onupgradeneeded = function(){
  //     const db = request.result;
  //     const store = db.createObjectStore("todos",{keyPath:"id"});
  //     // store.createIndex("status","status",{unique:false});
  //     // store.createIndex("todo","todo",{unique:false});
  //   }

  //   request.onsuccess = function(){
  //     const db = request.result;
  //     const transaction = db.transaction("todos","readwrite");

  //     const store = transaction.objectStore("id");
  //     const status = transaction.objectStore("status");
  //     const todo = transaction.objectStore("todo");

  //     index = store;
  //   }

  //   return index;
  // }

  // connectIndexedDB(){
  //   const dbName = "notes";
  //   // This is what our customer data looks like.

  //   // const customerData = [
  //   //   { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  //   //   { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" },
  //   // ];


  //   const request = indexedDB.open(dbName, 2);
  //   let store;

  //   request.onerror = (event) => {
  //     console.error("Why didn't you allow my web app to use IndexedDB?!");
  //   };

  //   request.onsuccess = (event:any) => {
  //     // const db = event.target.result;
  //     console.log("Success");
  //   };

  //   console.log("connectIndexedDB Executed!!");
  //   return request;

  //   // request.onupgradeneeded = (event:any) => {
  //   //   const db = event.target.result;
  //   //   const objectStore = db.createObjectStore("customers", { keyPath: "ssn" });
  //   //   objectStore.createIndex("name", "name", { unique: false });
  //   //   objectStore.createIndex("email", "email", { unique: true });
  //   //   objectStore.transaction.oncomplete = (event:any) => {
  //   //     const customerObjectStore = db
  //   //       .transaction("customers", "readwrite")
  //   //       .objectStore("customers");
  //   //     customerData.forEach((customer) => {
  //   //       customerObjectStore.add(customer);
  //   //     });
  //   //   };
  //   // };

  // }

  // -----------------------------------------

  indexedDBSupport(){
    return 'indexedDB' in window;
  }

  db:any;

  createDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.indexedDBSupport()) reject(new Error("Your browser doesn't support IndexedDB"));
  
      const request = window.indexedDB.open('Notes', 1);
  
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
  
        const objectStore = db.createObjectStore('todos', { keyPath: 'id' });
  
        // Ensure any necessary modifications or setups are done here
      };
    });
  }
  

  addTodo(){
    const transaction = this.db.transaction('todos', 'readwrite');

    const objectStore = transaction.objectStore('todos');
    const id = uuid.v4();
    let todo = {
      id:id,
      status:'pending',
      todo:this.todo
    }

    this.todos.unshift(todo);
    
    // Add new Todo
    const request = objectStore.add(todo);

    request.onsuccess = ()=> {
        console.log(`New Todo added`);
        this.todo = '';
        this._toast.displayToast('success','New Todo Added Successfully!');
    }

    request.onerror = (err:any)=> {
        console.error(`Error in adding Todo`);
    }

  }

  markAsCompleted(id:string){
    const objectStore = this.db.transaction('todos','readwrite')
                          .objectStore('todos');

    const request = objectStore.get(id);

    request.onsuccess = ()=> {

        const todo = request.result;

        // Change the name property
        todo.status = 'completed';

        // Create a request to update
        const updateRequest = objectStore.put(todo);
        // const updateRequest = objectStore.update(todo);

        updateRequest.onsuccess = () => {

          let index = this.findElementIndex(this.todos,id);
            this.todos[index].status = 'completed';

        }
    }
}

  deleteTodo(id:string){
    let index = this.findElementIndex(this.todos,id);
    this.todos.splice(index,1);
    const request = this.db.transaction('todos', 'readwrite')
                      .objectStore('todos')
                      .delete(id);

    request.onsuccess = ()=> {
        console.log(`Todo deleted`);
    }

    request.onerror = (err:any)=> {
        console.error(`Error in deleting todo`)
    }
  }

  async getAllTodos(){
    await this.createDatabase();
    console.log("should be after db value");
    const request = this.db.transaction('todos')
                   .objectStore('todos')
                   .getAll();

    request.onsuccess = ()=> {
        this.todos = request.result;
        console.log(this.todos);
    }

    request.onerror = (err:any)=> {
        console.error(`Error to get student information: ${err}`)
    }
  }

















}

// TODO As for now i am storing todo in simple array but in future this should be datewise.
// {
//   'date':'03/jan/2024',
//   'todos':[
//     {
//       id:'',
//       status:'',
//       todo:'this is my first todo'
//     },
//     {
//       id:'',
//       status:'',
//       todo:'this is my Second todo'
//     },
//     {
//       id:'',
//       status:'',
//       todo:'this is my Third todo'
//     }
//   ]
// },
// {
//   'date':'03/jan/2024',
//   'todos':[
//     {
//       id:'',
//       status:'',
//       todo:'this is my first todo'
//     },
//     {
//       id:'',
//       status:'',
//       todo:'this is my Second todo'
//     },
//     {
//       id:'',
//       status:'',
//       todo:'this is my Third todo'
//     }
//   ]
// }


// 
