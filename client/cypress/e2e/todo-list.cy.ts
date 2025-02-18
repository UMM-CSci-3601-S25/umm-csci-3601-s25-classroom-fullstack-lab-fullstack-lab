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

  it('Should show 10 todos in both card and list view', () => {
    page.getTodoCards().should('have.length', 10);
    page.changeView('list');
    page.getTodoListItems().should('have.length', 10);
  });

  it('Should type something in the owner filter and check that it returned correct elements', () => {
    // Filter for todo 'Fry'
    cy.get('[data-test=todoOwnerInput]').type('Fry');

    // All of the todo cards should have the owner we are filtering by
    page.getTodoCards().each(e => {
      cy.wrap(e).find('.todo-card-owner').should('have.text', 'Fry');
    });

    // (We check this two ways to show multiple ways to check this)
    page.getTodoCards().find('.todo-card-owner').each(el =>
      expect(el.text()).to.equal('Fry')
    );
  });

  it('Should type something in the category filter and check that it returned correct elements', () => {
    // Filter for category 'video games'
    cy.get('[data-test=todoCategoryInput]').type('video games');

    page.getTodoCards().should('have.lengthOf.above', 0);

    // All of the todo cards should have the category we are filtering by
    page.getTodoCards().find('.todo-card-category').each(card => {
      cy.wrap(card).should('have.text', 'video games');
    });
  });

  it('Should type something partial in the category filter and check that it returned correct elements', () => {
    // Filter for category that contain 'homework'
    cy.get('[data-test=todoCategoryInput]').type('homework');

    page.getTodoCards().should('have.lengthOf', 2);

    // Each todo card's category name should include the text we are filtering by
    page.getTodoCards().each(e => {
      cy.wrap(e).find('.todo-card-category').should('include.text', 'homework');
    });
  });

  it('Should type something partial in the body filter and check that it returned correct elements', () => {
    // Filter for body that contain 'quis'
    cy.get('[data-test=todoBodyInput]').type('quis');

    page.getTodoCards().should('have.lengthOf', 2);

    // Each todo card's body name should include the text we are filtering by
    page.getTodoCards().each(e => {
      cy.wrap(e).find('.todo-card-body').should('include.text', 'quis');
    });
  });

  it('Should type something in the limit filter and check that it returned correct elements', () => {
    // Filter for limit
    cy.get('[data-test=todoLimitInput]').type('7');

    page.getTodoCards().should('have.lengthOf.above', 0);

    // All of the todo cards should have the limit we are filtering by
    page.getTodoCards().find('.todo-card-limit').each(card => {
      cy.wrap(card).should('have.lengthOf', '7');
    });
  });


  it('Should type something partial in the status filter and check that it returned correct elements', () => {
    // Filter for status that contain true
    cy.get('[data-test=todoStatusInput]').type('true');

    page.getTodoCards().should('have.lengthOf', 2);

    // Each todo card's status should include the text we are filtering by
    page.getTodoCards().each(e => {
      cy.wrap(e).find('.todo-card-status').contains('complete');
    });
  });

  it('Should type something partial in the status filter and check that it returned correct elements', () => {
    // Filter for status that contain false
    cy.get('[data-test=todoStatusInput]').type('false');

    page.getTodoCards().should('have.lengthOf', 2);

    // Each todo card's status should include the text we are filtering by
    page.getTodoCards().each(e => {
      cy.wrap(e).find('.todo-card-status').contains('incomplete');
    });
  });

});

