import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { Todo, TodoCategory } from './todo';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient: HttpClient) {
  }


    filterTodos(todos: Todo[], filters: { status?: boolean; owner?: string; category?: TodoCategory; body?: string; }): Todo[] { // skipcq: JS-0105
      let filteredTodos = todos;

      // filter by status
      if (filters.status !== undefined) {
        filteredTodos = filteredTodos.filter(todo => todo.status === filters.status);
      }


      // filter by owner




      // filter by category




      // filter by body





      return filteredTodos;
    }






}
