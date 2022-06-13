describe('profil spec', () => {
	it('visit page', () => {
		cy.visit('/profil');
	});

	it('profile validation', () => {
		cy.get('h1').should('contain', 'Profil').and('be.visible');
		cy.contains('Username').should('be.visible');
		cy.contains('Password').should('be.visible');
		cy.contains('Email').should('be.visible');
		cy.contains('Ime').should('be.visible');
		cy.contains('Prezime').should('be.visible');
		cy.contains('Permisije').should('be.visible');
	});
});
