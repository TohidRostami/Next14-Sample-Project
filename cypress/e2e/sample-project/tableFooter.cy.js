describe('Table footer test', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })


    it("Table pagination's Next page button", () => {
        cy.wait(2000);
        // Checks id of first and last row of table
        cy.get("tr").get("td").eq(0).contains("1")
        cy.get("tr").get("td").eq(24).contains("5")

        // Goes to the next table page
        cy.get("button[aria-label='Go to next page']").click();

        // Checks next id of first and last row of table
        cy.get("tr").get("td").eq(0).contains("6")
        cy.get("tr").get("td").eq(24).contains("10")

        // Goes back to the previous page
        cy.get("button[aria-label='Go to previous page']").click();

        // Checks id of first and last row of table
        cy.get("tr").get("td").eq(0).contains("1")
        cy.get("tr").get("td").eq(24).contains("5")
    });

    it('Testing Rows per page combobox', () => {
        cy.wait(2000);
        // Checks id of first and last row of table to make sure there's 5 row
        cy.get("tr").get("td").eq(0).contains("1")
        cy.get("tr").get("td").eq(24).contains("5")

        // Change Row per page to see 10 row after change
        cy.get('div[role="combobox"]').contains(5).click();
        cy.get('li[role="option"]').contains(10).click();

        // Checks id of first and last row of table to make sure there's 10 row
        cy.get("tr").get("td").eq(0).contains("1")
        cy.get("tr").get("td").eq(54).contains("10")

        // Change Row per page to see 15 row after change
        cy.get('div[role="combobox"]').contains(10).click();
        cy.get('li[role="option"]').contains(15).click();

        // Checks id of first and last row of table to make sure there's 15 row
        cy.get("tr").get("td").eq(0).contains("1")
        cy.get("tr").get("td").eq(84).contains("15")

        // Change Row per page to get back to default
        cy.get('div[role="combobox"]').contains(15).click();
        cy.get('li[role="option"]').contains(5).click();

        // Checks id of first and last row of table to make sure there's 5 row
        cy.get("tr").get("td").eq(0).contains("1")
        cy.get("tr").get("td").eq(24).contains("5")

    })
})