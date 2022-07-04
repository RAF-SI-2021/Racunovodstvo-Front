describe('analiticke-kartice spec', () => {
	it('visit page', () => {
		cy.visit('/analiticke-kartice');
	});

	it('pretrazi', () => {
		cy.get('#konto').type('301{downArrow}{enter}');
		cy.get('#komitent').type('Blue{downArrow}{enter}');

		cy.get('.mat-start-date').type('6/6/2016');
		cy.get('.mat-end-date').type('6/20/2022');

		cy.get('.mat-focus-indicator:nth-child(2)').click();
	});
});
