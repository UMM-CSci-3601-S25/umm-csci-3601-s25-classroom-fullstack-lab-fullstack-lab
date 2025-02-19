import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { map } from 'rxjs/operators';
import { Todo, TodoCategory } from './todo';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  readonly todoUrl: string = '${environment.apiUrl}todos';

  constructor(private httpClient: HttpClient) {
  }

  // implement getTodos
  getTodos(filters: { category?: TodoCategory; status?: boolean; body?: string;}): Observable<Todo[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters) {

      // filter by category
    if (filters.category !== undefined) {
      httpParams = httpParams.set('category', filters.category);

      
    }
  }


    return this.httpClient.get<Todo[]>(this.todoUrl, {
      params: httpParams,

    });
}


    filterTodos(todos: Todo[], filters: { status?: boolean; owner?: string; category?: TodoCategory; body?: string; }): Todo[] { // skipcq: JS-0105
      let filteredTodos = todos;

      // filter by status
      if (filters.status !== undefined) {
        filteredTodos = filteredTodos.filter(todo => todo.status === filters.status);
      }



      return filteredTodos;
    }






}
