describe('Testing Theme and Translation Providers', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it("Changing language", () => {
        cy.wait(2000);

        // Check the default language
        // cy.get('div[role="combobox"]').contains("English");
        cy.get('h2').contains("Products");

        // Changing language to German
        cy.get('div[role="combobox"]').contains("English").click();
        cy.get('li[role="option"').contains("German").click();
        cy.get('h2').contains("Produkte");

        // Changing lamguage to default
        cy.get('div[role="combobox"]').contains("German").click();
        cy.get('li[role="option"').contains("English").click();
        cy.get('h2').contains("Products");
    })

    it("Changing Theme", () => {
        cy.wait(2000);

        // Check the background color is white  for light mode
        cy.get('body').should('have.css', 'background-color', 'rgb(255, 255, 255)');

        // Changing theme and check the background color
        cy.get('div[role="combobox"]').contains("Light").click();
        cy.get('li[role="option"').contains("Dark").click();
        cy.get('body').should('have.css', 'background-color', 'rgb(18, 18, 18)');
    })
})