import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-todopage',
  templateUrl: './todopage.component.html',
  styleUrls: ['./todopage.component.css']
})
export class TodopageComponent implements OnInit {

  storage = window.sessionStorage
  uemail = this.storage.getItem("email")
  upass = this.storage.getItem("password")
  toDoList = []
  table_header = ["To Do","When Added","Delete"];
  isAddMore = false;
  isAddSubmit = false;

  constructor(private httpService:HttpService) { }

  ngOnInit(): void {
    this.httpService.get_todo_list(this.uemail,this.upass).subscribe(
      data => {
          this.toDoList = data
      },
      error => {
        
      }
    );    
  }

  addToDo(form:NgForm){
    this.isAddSubmit = true
    let toDo = form.value.todo
    this.httpService.add_todo(this.uemail,this.upass,toDo).subscribe(
      data => {
        if('error' in data){
          alert(data['error'])
        }
        else{
          this.toDoList = data
          form.resetForm();
        }
        this.isAddSubmit = false
      },
      error => {
        this.isAddSubmit = false
      }
    );
  }

  delToDo(val){
    let toDoId = val
    this.httpService.remove_todo(this.uemail,this.upass,toDoId).subscribe(
      data => {
        if('error' in data){
          alert(data['error'])
        }
        else{
          this.toDoList = data
        }
      },
      error => {
        
      }
    );
  }

  addMoreToggle(){
    this.isAddMore = !this.isAddMore;
  }

}
