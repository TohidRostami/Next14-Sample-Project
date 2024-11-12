describe("Table body test", () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })

    it("Testing edit product button & edit product fields.", () => {
        cy.wait(2000);
        // First click on the edit button
        cy.get("tr").get("td").eq(4).click();
        // Check fields for right product infos
        cy.get('[aria-labelledby="modal-title"]').should('exist');
        //Title
        cy.get('input[id="title"]').should('not.have.value', '');
        // Price
        cy.get('input[id="price"]').should('not.have.value', '');
        // Description
        cy.get('input[id="description"]').should('not.have.value', '');
        // Image
        cy.get('input[id="image"]').should('not.have.value', '');
        // Category
        cy.get('input[id="category-select"]').should('not.have.value', '');
        // Check box
        cy.get('input[name="editCheckbox"]').should('not.be.checked');
        // Back button
        cy.get('button[data-testid="backButton"]').should('exist');
        cy.get('button[data-testid="backButton"]').click();
        // modal should be closed now
        cy.get('[aria-labelledby="modal-title"]').should('not.be.exist');
    });

    it("Testing edit fields of product.", () => {
        cy.wait(2000);
        // First click on the edit button
        cy.get("tr").get("td").eq(4).click();
        // get the Title field and change its value
        cy.get('input[id="title"]').click().clear();
        cy.get('input[id="title"]').click().type('This is from cypress test.');
        // get the Price field and change its value
        cy.get('input[id="price"]').click().clear();
        cy.get('input[id="price"]').click().type('200');
        // get the Description field and change its value
        cy.get('input[id="description"]').click().clear();
        cy.get('input[id="description"]').click().type('This is a description from cypress test.');
        // get the Category field and change its value
        cy.get('input[id="category-select"]').click();
        cy.get('li[data-option-index="0"]').contains('electronics').click();
        // get the Image field and change its value
        cy.get('input[id="image"]').click().clear();
        cy.get('input[id="image"]').click().type('This is a image from cypress test.');
        // get the checkbox and check it for sumbit the form
        cy.get('input[name="editCheckbox"]').click();
        cy.get('input[name="editCheckbox"]').should('be.checked');
        // get the submit button to submit the form
        cy.get('button[type="submit"]').should('exist');
        cy.get('button[type="submit"]').click();
    });

    it('Testing DeleteModal button', () => {
        cy.wait(2000);
        // First click on the edit button
        cy.get("tr").get("td").eq(5).click();
        // click on delete buton
        cy.get('button').contains("Delete").click();
        // DeleteModal should be closed
        cy.get('[aria-labelledby="modal-title"]').should('not.exist');
    });
})