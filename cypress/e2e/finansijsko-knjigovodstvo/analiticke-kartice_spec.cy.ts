describe('analiticke-kartice spec', () => {
	it('visit page', () => {
		cy.visit('/analiticke-kartice');
	});

	it('pretrazi', () => {
		// trebaju mi test podaci koji vracaju nesto
		cy.get('#konto').type('302{downArrow}{enter}');
		cy.get('#komitent').type('Preduzece{downArrow}{enter}');

		cy.get('.mat-start-date').type('6/6/2022');
		cy.get('.mat-end-date').type('6/20/2022');

		cy.get('.mat-focus-indicator:nth-child(2)').click();
	});
});
