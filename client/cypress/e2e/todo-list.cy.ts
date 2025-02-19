import { TodoListPage } from '../support/todo-list.po';

const page = new TodoListPage();

describe('Todo list', () => {

  before(() => {
    cy.task('seed:database');
  });

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    page.getTodoTitle().should('have.text', 'Todos');
  });

  it('Should show 300 todos in list view', () => {
    //page.getTodoCards().should('have.length', 10);
    page.getVisibleTodos().should('have.length', 300);

  });

  it('Should type something in the owner filter and check that it returned correct elements', () => {
    // Filter for todo 'Fry'


    page.filterByOwner('Fry')

    page.getVisibleTodos().should('have.lengthOf',1)

     // Go through each of the visible todos that are being shown and get the owner

     page.getTodoOwners()
   //We should see these todos who owner contains Fry
   .should('contain.text', 'Fry')
      // We shouldn't see these todos
      .should('not.contain.text', 'Blanche')
      .should('not.contain.text', 'Barry')
  });

  it('Should type something in the category filter and check that it returned correct elements', () => {
    // Filter for category 'video games'
    cy.get('[data-test=todoCategoryInput]').type('video games');

    //page.getTodoCards().should('have.lengthOf.above', 0);

    // All of the todo cards should have the category we are filtering by
   // page.getTodoCards().find('.todo-card-category').each(card => {
     // cy.wrap(card).should('have.text', 'video games');
    //});
  });

  it('Should type something partial in the category filter and check that it returned correct elements', () => {
    // Filter for category that contain 'homework'
    cy.get('[data-test=todoCategoryInput]').type('homework');

    //page.getTodoCards().should('have.lengthOf', 2);

    // Each todo card's category name should include the text we are filtering by
    //page.getTodoCards().each(e => {
    //  cy.wrap(e).find('.todo-card-category').should('include.text', 'homework');
    //});
  });

  it('Should type something partial in the body filter and check that it returned correct elements', () => {
    // Filter for body that contain 'quis'
    cy.get('[data-test=todoBodyInput]').type('quis');

   // page.getTodoCards().should('have.lengthOf', 2);

    // Each todo card's body name should include the text we are filtering by
    //page.getTodoCards().each(e => {
     // cy.wrap(e).find('.todo-card-body').should('include.text', 'quis');
  //  });
  });

  it('Should type something in the limit filter and check that it returned correct elements', () => {
    // Filter for limit
    cy.get('[data-test=todoLimitInput]').type('7');

   // page.getTodoCards().should('have.lengthOf.above', 0);

    // All of the todo cards should have the limit we are filtering by
   // page.getTodoCards().find('.todo-card-limit').each(card => {
    //  cy.wrap(card).should('have.lengthOf', '7');
   // });
  });


  it('Should type something partial in the status filter and check that it returned correct elements', () => {
    // Filter for status that contain true
    cy.get('[data-test=todoStatusInput]').type('true');

   // page.getTodoCards().should('have.lengthOf', 2);

    // Each todo card's status should include the text we are filtering by
   // page.getTodoCards().each(e => {
     // cy.wrap(e).find('.todo-card-status').contains('complete');
    //});
  });

  it('Should type something partial in the status filter and check that it returned correct elements', () => {
    // Filter for status that contain false
    cy.get('[data-test=todoStatusInput]').type('false');

   // page.getTodoCards().should('have.lengthOf', 2);

    // Each todo card's status should include the text we are filtering by
   // page.getTodoCards().each(e => {
    //  cy.wrap(e).find('.todo-card-status').contains('incomplete');
    });
  });


