describe('add-new-client spec', () => {
	it('visit page', () => {
		cy.visit('/add-new-client');
	});

	it('add-new-client validation', () => {
		cy.get('h1').should('contain', 'Komitenti').and('be.visible');
		cy.get('ngb-accordion');
		cy.contains('Dodaj novog').should('be.visible');
	});

	it('accordion', () => {
		cy.get('ngb-accordion').should('be.visible');
		cy.get('.accordion-button').should('contain', 'Universal UK');
		cy.get('.accordion-button').find('input');
		cy.get('.accordion-button').find('button').contains('Obriši');
	});

	it('accordion click', () => {
		cy.get('.accordion-button').first().click();
		cy.get('.accordion-body').should('be.visible');
		cy.get('.accordion-button').first().click();
		cy.get('.accordion-body').should('not.exist');
	});

	it('delete', () => {
		cy.get('.btn-danger').first().click();
	});

	it('add new', () => {
		cy.get('.btn-success').click();
		cy.get('.border > .form-control:nth-child(1)').type('Naziv');
		cy.get('.border > .form-control:nth-child(2)').type('123456789');
		cy.get('.border > .form-control:nth-child(3)').type('adresa');
		cy.get('.border > .form-control:nth-child(4)').type('grad');
		cy.get('.btn:nth-child(5)').click();
		cy.get('.btn-success').click();
	});
});
