import { HttpClient, HttpParams, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { Todo } from './todo';
import { TodoService } from './todo.service';

describe('TodoService', () => {

  // A small collection of test todos

  const testTodos: Todo[] = [
    {
      _id: 'chris_id',
      owner: 'Chris',
      status: true,
      body: 'In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.',
      category: 'software design'
    },
    {
      _id: 'pat_id',
      owner: 'Pat',
      status: false,
      body: 'Ipsum esse est ullamco magna tempor anim laborum non officia deserunt veniam commodo. Aute minim incididunt ex commodo.',
      category: 'video games'
    },
    {
      _id: 'jamie_id',
      owner: 'Jamie',
      status: true,
      body: 'Deserunt in tempor est id consectetur cupidatat. Deserunt officia id Lorem nostrud amet.',
      category: 'homework'
    }
  ];



    let todoService: TodoService;
    // These are used to mock the HTTP requests so that we (a) don't have to
    // have the server running and (b) we can check exactly which HTTP
    // requests were made to ensure that we're making the correct requests.
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
      // Set up the mock handling of the HTTP requests
      TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
  });


      // Construct an instance of the service with the mock HTTP client.
      httpClient = TestBed.inject(HttpClient);
      httpTestingController = TestBed.inject(HttpTestingController);
      todoService = new TodoService(httpClient);

    });


    afterEach(() => {
      // After every test, assert that there are no more pending requests.
      httpTestingController.verify();
    });


    describe('filterTodosByStatus', () => {

      it('filters by status', () => {

        const todoStatus = true;
        const filteredTodos = todoService.filterTodosByStatus(testTodos, {status: todoStatus });

        expect(filteredTodos.length).toBe(2);

        filteredTodos.forEach(todo => {
          expect(todo.status.indexOf(todoStatus)).toBeGreaterThanOrEqual(0);

      });

    });

})


});
