import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo, TodoCategory } from './todo';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  //filter method that takes todos and returns them by status

  filterTodosByStatus(todos: Todo[], status: boolean): Todo[] {
    return todos.filter(todo => todo.status === status);
  }


  //filter method that takes todos and returns them by category




  //filter method that takes todos and returns them by owner




  // filter method that takes todos and returns them by body




}
