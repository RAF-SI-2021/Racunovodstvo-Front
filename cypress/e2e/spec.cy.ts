describe('home spec', () => {
	it('visit page', () => {
		cy.visit('');
	});

	it('header validation', () => {
		cy.contains('Profil').should('be.visible');
		cy.contains('Evidencije').should('be.visible');
		cy.contains('Izvestaji').should('be.visible');
		cy.contains('Finansijska operativa').should('be.visible');
		cy.contains('Finansijsko knjigovodstvo').should('be.visible');
		cy.contains('Obračun zarade').should('be.visible');
		cy.contains('Nabavke').should('be.visible');
		cy.contains('Prodaja').should('be.visible');
	});

	// todo: centri, konverzije, manage-users
});
