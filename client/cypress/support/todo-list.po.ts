//import { Todo} from 'src/app/todos/todo';

export class TodoListPage {
  private readonly baseUrl = '/todos';
  private readonly pageTitle = '.todo-list-title';
  private readonly todoCardSelector = '.todo-cards-container app-todo-card';
  private readonly todoListItemsSelector = '.todo-nav-list .todo-list-item';
  private readonly profileButtonSelector = '[data-test=viewProfileButton]';
  private readonly radioButtonSelector = '[data-test=viewTypeRadio] mat-radio-button';
  private readonly todoRoleDropdownSelector = '[data-test=todoRoleSelect]';
  private readonly dropdownOptionSelector = 'mat-option';
  private readonly addTodoButtonSelector = '[data-test=addTodoButton]';

  navigateTo() {
    return cy.visit(this.baseUrl);
  }


  getTodoTitle() {
    return cy.get(this.pageTitle);
  }


   getTodoCards() {
    return cy.get(this.todoCardSelector);
  }


  getTodoListItems() {
    return cy.get(this.todoListItemsSelector);
  }


  clickViewProfile(card: Cypress.Chainable<JQuery<HTMLElement>>) {
    return card.find<HTMLButtonElement>(this.profileButtonSelector).click();
  }


  changeView(viewType: 'card' | 'list') {
    return cy.get(`${this.radioButtonSelector}[value="${viewType}"]`).click();
  }




  addTodoButton() {
    return cy.get(this.addTodoButtonSelector);
  }
}
