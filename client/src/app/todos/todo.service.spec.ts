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
      _id: '58af3a600343927e48e8720f',
      owner: 'Blanche',
      status: false,
      body: 'In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.',
      category: 'software design',
    },
    {
      _id: '58af3a600343927e48e8721d',
      owner: 'Dawn',
      status: true,
      body: 'Magna exercitation pariatur in labore. Voluptate adipisicing reprehenderit dolor veniam dolore amet duis anim nisi.',
      category: 'homework',
    },
    {
      _id: '58af3a600343927e48e87223',
      owner: 'Fry',
      status: false,
      body: 'Aliquip dolor cupidatat incididunt mollit commodo aliqua aute amet reprehenderit incididunt excepteur ipsum reprehenderit. Consectetur est velit aute proident occaecat exercitation exercitation.',
      category: 'video games',
    }
  ];
  let todoService: TodoService;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    // Construct an instance of the service with the mock
    // HTTP client.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    todoService = new TodoService(httpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('When getTodos() is called with no parameters', () => {

     it('calls `api/todos`', waitForAsync(() => {

       const mockedMethod = spyOn(httpClient, 'get').and.returnValue(of(testTodos));

       todoService.getTodos().subscribe(() => {

         expect(mockedMethod)
           .withContext('one call')
           .toHaveBeenCalledTimes(1);

         expect(mockedMethod)
           .withContext('talks to the correct endpoint')
           .toHaveBeenCalledWith(todoService.todoUrl, { params: new HttpParams() });
       });
     }));
   });

   describe('When getTodos() is called with parameters, it correctly forms the HTTP request (Javalin/Server filtering)', () => {

    it('correctly calls api/todos with filter parameter \'video games\'', () => {
        const mockedMethod = spyOn(httpClient, 'get').and.returnValue(of(testTodos));
        todoService.getTodos({ category: 'video games' }).subscribe(() => {
          expect(mockedMethod)
            .withContext('one call')
            .toHaveBeenCalledTimes(1);

          expect(mockedMethod)
            .withContext('talks to the correct endpoint')
            .toHaveBeenCalledWith(todoService.todoUrl, { params: new HttpParams().set('category', 'video games') });
        });
    });


    it('filters by body', () => {
      const todoBody = 'quis';
      const filteredTodos = todoService.filterTodos(testTodos, { body: todoBody });
      // There should be two users with an 'i' in their
      // name: Chris and Jamie.
      expect(filteredTodos.length).toBe(1);
      // Every returned user's name should contain an 'i'.
      filteredTodos.forEach(todo => {
        expect(todo.body.indexOf(todoBody)).toBeGreaterThanOrEqual(0);
      });
    });


    it('correctly calls api/todos with filter parameter \'owner\'', () => {
      const mockedMethod = spyOn(httpClient, 'get').and.returnValue(of(testTodos));

      todoService.getTodos({ owner:'Blanche' }).subscribe(() => {
        expect(mockedMethod)
          .withContext('one call')
          .toHaveBeenCalledTimes(1);
        expect(mockedMethod)
          .withContext('talks to the correct endpoint')
          .toHaveBeenCalledWith(todoService.todoUrl, { params: new HttpParams().set('owner', 'Blanche') });
      });
    });

    it('correctly calls api/users with multiple filter parameters', () => {
      const mockedMethod = spyOn(httpClient, 'get').and.returnValue(of(testTodos));

      todoService.getTodos({ owner: 'Blanche', category: 'software design' }).subscribe(() => {
        // This test checks that the call to `userService.getUsers()` does several things:
        //   * It calls the mocked method (`HttpClient#get()`) exactly once.
        //   * It calls it with the correct endpoint (`userService.userUrl`).
        //   * It calls it with the correct parameters:
        //      * There should be three parameters (this makes sure that there aren't extras).
        //      * There should be a "role:editor" key-value pair.
        //      * And a "company:IBM" pair.
        //      * And a "age:37" pair.

        // This gets the arguments for the first (and in this case only) call to the `mockMethod`.
        const [url, options] = mockedMethod.calls.argsFor(0);
        // Gets the `HttpParams` from the options part of the call.
        // `options.param` can return any of a broad number of types;
        // it is in fact an instance of `HttpParams`, and I need to use
        // that fact, so I'm casting it (the `as HttpParams` bit).
        const calledHttpParams: HttpParams = (options.params) as HttpParams;
        expect(mockedMethod)
          .withContext('one call')
          .toHaveBeenCalledTimes(1);
        expect(url)
          .withContext('talks to the correct endpoint')
          .toEqual(todoService.todoUrl);
        expect(calledHttpParams.keys().length)
          .withContext('should have 2 params')
          .toEqual(2);
        expect(calledHttpParams.get('owner'))
          .withContext('owner being Blanche')
          .toEqual('Blanche');
        expect(calledHttpParams.get('category'))
          .withContext('category being software design')
          .toEqual('software design');
      });
  });
});

describe('When getTodoById() is given an ID', () => {
   /* We really don't care what `getUserById()` returns. Since all the
    * interesting work is happening on the server, `getUserById()`
    * is really just a "pass through" that returns whatever it receives,
    * without any "post processing" or manipulation. The test in this
    * `describe` confirms that the HTTP request is properly formed
    * and sent out in the world, but we don't _really_ care about
    * what `getUserById()` returns as long as it's what the HTTP
    * request returns.
    *
    * So in this test, we'll keep it simple and have
    * the (mocked) HTTP request return the `targetUser`
    * Furthermore, we won't actually check what got returned (there won't be an `expect`
    * about the returned value). Since we don't use the returned value in this test,
    * It might also be fine to not bother making the mock return it.
    */
    it('calls api/todos/id with the correct ID', waitForAsync(() => {
      // We're just picking a User "at random" from our little
      // set of Users up at the top.
      const targetTodo: Todo = testTodos[1];
      const targetId: string = targetTodo._id;

      // Mock the `httpClient.get()` method so that instead of making an HTTP request
      // it just returns one user from our test data
      const mockedMethod = spyOn(httpClient, 'get').and.returnValue(of(targetTodo));

      // Call `userService.getUser()` and confirm that the correct call has
      // been made with the correct arguments.
      //
      // We have to `subscribe()` to the `Observable` returned by `getUserById()`.
      // The `user` argument in the function below is the thing of type User returned by
      // the call to `getUserById()`.
      todoService.getTodoById(targetId).subscribe(() => {
        // The `User` returned by `getUserById()` should be targetUser, but
        // we don't bother with an `expect` here since we don't care what was returned.
        expect(mockedMethod)
          .withContext('one call')
          .toHaveBeenCalledTimes(1);
        expect(mockedMethod)
          .withContext('talks to the correct endpoint')
      });
    }));
  });

    describe('Filtering on the client using `filterTodos()` (Angular/Client filtering)', () => {

      it('filters by owner', () => {
        const todoOwner = 'Fry';
        const filteredTodos = todoService.filterTodos(testTodos, { owner: todoOwner });

        expect(filteredTodos.length).toBe(1);

        filteredTodos.forEach(todo => {
          expect(todo.owner.indexOf(todoOwner)).toBeGreaterThanOrEqual(0);
        });
      });

      it('filters by body', () => {
        const todoBody = 'quis';
        const filteredTodos = todoService.filterTodos(testTodos, { body: todoBody });

        expect(filteredTodos.length).toBe(1);

        filteredTodos.forEach(todo => {
          expect(todo.body.indexOf(todoBody)).toBeGreaterThanOrEqual(0);
        });
      });

      it('filters by category', () => {
        const todoCategory = 'video games';
        const filteredTodos = todoService.filterTodos(testTodos, { category: todoCategory });

        expect(filteredTodos.length).toBe(1);

        filteredTodos.forEach(todo => {
          expect(todo.category.indexOf(todoCategory)).toBeGreaterThanOrEqual(0);
        });
      });

    });
  });
