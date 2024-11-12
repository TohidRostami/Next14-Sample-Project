describe('Form Component E2E Test', () => {

  beforeEach(() => {
    // Visit the form page
    cy.visit('http://localhost:3000/');
    cy.wait(1000);
    cy.contains('button', 'Add Product').click();
  });

  it('Displays form fields and buttons', () => {
    // Check for each input field and button to be visible
    cy.get('input[id="title"]').should('be.visible');
    cy.get('input[id="price"]').should('be.visible');
    cy.get('input[id="description"]').should('be.visible');
    cy.get('input[id="image"]').should('be.visible');
    cy.get('input[aria-label="controlled"]').parent().click();
    cy.contains('button', 'Add Product').should('be.visible');
    cy.get('[data-testid="backButton"]').should('be.visible');
  });

  it('Fills valid values in form fields and checks submits', () => {
    // Product const for valid input testing
    const product = {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: "109.95",
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    };

    // Fill in form fields
    cy.get('input[id="title"]').type(`${product.title}`);
    cy.get('input[id="price"]').type(`${product.price}`);
    cy.get('input[id="description"]').type(`${product.description}`);
    cy.get('input[id="image"]').type(`${product.image}`);

    // Select a category from Autocomplete dropdown
    cy.get('input[aria-autocomplete="list"]').click();
    cy.contains('li', "men's clothing").click();

    // Check the checkbox to enable the submit button
    cy.get('input[aria-label="controlled"]').check();

    // Check that the submit button is now enabled
    cy.contains('button', 'Add Product').should('not.be.disabled');

    // Submit the form
    cy.contains('button', 'Add Product').click();

    // Verify the form submission (Assuming there's some post-submission effect)
    cy.url().should('include', '/');
  });

  it('Handles back button click', () => {
    // Simulate clicking the back button and check that it triggers the right action
    cy.get('[data-testid="backButton"]').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });


  it('Fills invalud values in form fields, checks error validation, and submits', () => {

    // Fill in form fields
    cy.get('input[id="title"]').type('jes');
    cy.get('input[id="price"]').type('x');
    cy.get('input[id="description"]').type('A');
    cy.get('input[id="image"]').type("B");

    // Select a category from Autocomplete dropdown
    cy.get('input[aria-autocomplete="list"]').click();
    cy.contains('li', "men's clothing").click();

    // Check the checkbox to enable the submit button
    cy.get('input[aria-label="controlled"]').check();

    // Check that the submit button is now enabled
    cy.contains('button', 'Add Product').should('not.be.disabled');

    // Submit the form
    cy.contains('button', 'Add Product').click();

    // For fields with min(4)
    cy.get("span").should("contain", "String must contain at least 4 character(s)")
    // For price field
    cy.get("span").should("contain", "Price must be a number")
  });
});
