import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Todo, TodoCategory } from './todo';
import { Company } from '../company-list/company';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  //filter method that takes todos and returns them by status

  filterTodosByStatus(todos: Todo[], completed: boolean): Todo[] {
    return todos.filter(todo => todo.completed === completed);
  }



}
