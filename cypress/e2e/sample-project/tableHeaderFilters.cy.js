describe('TableHeader Component', () => {
    beforeEach(() => {
        // Visit the page where the TableHeader component is rendered
        cy.visit('http://localhost:3000');
    });

    it('displays the table headers and filter fields', () => {
        // Check that headers are visible
        cy.get('th').should('exist');

        // Check the presence of each column header based on `headerGroups`
        cy.get('th').each(($th, index) => {
            cy.wrap($th).should('be.visible');
        });

        // Check that the filter input fields are displayed
        cy.get('input[placeholder*="Search"]').each(($input) => {
            cy.wrap($input).should('be.visible').and('have.value', ''); // Ensure the filter fields are initially empty
        });

        // Check that filter and reset buttons are present
        cy.get('button[aria-label="Filter"]').should('be.visible');
        cy.get('button[aria-label="Reset"]').should('be.visible');
    });

    it('applies and resets filters correctly', () => {
        // wait  to render
        cy.wait(2000);

        // Type into Id filter input
        cy.get('input[placeholder*="Search"]').eq(0).type(11);

        // Apply the filter
        cy.get('button[aria-label="Filter"]').click();

        // Check for the right value
        cy.get("tr").get("td").first().contains("11");

        // Reset filters
        cy.get('button[aria-label="Reset"]').click();

        // Check if filter input is cleared
        cy.get('input[placeholder*="Search"]').should('have.value', '');


        // Type into Title filter input
        cy.get('input[placeholder*="Search"]').eq(1).type("Fjallraven");

        // Apply the filter
        cy.get('button[aria-label="Filter"]').click();

        // Check for the right value
        cy.get("tr").get("td").eq(1).contains("Fjallraven");

        // Reset filters
        cy.get('button[aria-label="Reset"]').click();

        // Check if filter input is cleared
        cy.get('input[placeholder*="Search"]').should('have.value', '');


        // Type into Price filter input
        cy.get('input[placeholder*="Search"]').eq(2).type(9);

        // Apply the filter
        cy.get('button[aria-label="Filter"]').click();

        // Reset filters
        cy.get('button[aria-label="Reset"]').click();

        // Check if filter input is cleared
        cy.get('input[placeholder*="Search"]').should('have.value', '');
    });

    it('applies two filters at the same time', () => {
        // Type into Id and Price filter input
        cy.get('input[placeholder*="Search"]').eq(0).type(1);
        cy.get('input[placeholder*="Search"]').eq(2).type(59);

        // Apply the filter
        cy.get('button[aria-label="Filter"]').click();

        // Reset filters
        cy.get('button[aria-label="Reset"]').click();

        // Check if filter input is cleared
        cy.get('input[placeholder*="Search"]').should('have.value', '');
    })

    it('handles sorting by toggling column headers', () => {
        // Click on the first column header to sort Ids
        cy.wait(2000)
        cy.get('th').first().find('span').should("be.empty");
        cy.get('th').first().contains("Id").click();
        cy.get("tr").get("td").first().contains("1");
        cy.get('th').first().contains("Id").click();
        cy.get("tr").get("td").first().contains("20");
        cy.get('th').first().contains("Id").click();
        cy.get("tr").get("td").first().contains("1");

        // Click on the second column header to sort names
        cy.wait(1000);
        cy.get("th").eq(1).contains("Title").click();
        cy.get("tr").get("td").eq(1).invoke("text").then((text) => { expect(text.trim().charAt(0)).to.equal("A") });
        cy.get("th").eq(1).contains("Title").click();
        cy.get("tr").get("td").eq(1).invoke("text").then((text) => { expect(text.trim().charAt(0)).to.equal("W") });
        cy.get("th").eq(1).contains("Title").click();
    });

});
