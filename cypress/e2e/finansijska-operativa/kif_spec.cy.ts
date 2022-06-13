describe('KIF spec', () => {
	it('visit page', () => {
		cy.visit('/KIF');
	});

	it('datumIzdavanja', () => {
		cy.get('#opcije').select('datumIzdavanja');
		cy.get('#vrednost').type('2022-06-13');
		cy.get('.btn-outline-primary').click();
	});

	it('datumPlacanja', () => {
		cy.get('#opcije').select('datumPlacanja');
		cy.get('#vrednost').type('2022-06-13');
		cy.get('.btn-outline-primary').click();
	});

	it('rokZaPlacanje', () => {
		cy.get('#opcije').select('rokZaPlacanje');
		cy.get('#vrednost').type('2022-06-13');
		cy.get('.btn-outline-primary').click();
	});

	it('valuta', () => {
		cy.visit('/KIF');
		cy.get('#opcije').select('valuta');
		cy.get('#vrednost').type('EUR');
		cy.get('.btn-outline-primary').click();
	});

	it('komentar', () => {
		cy.get('#opcije').select('komentar');
		cy.get('#vrednost').type('kom');
		cy.get('.btn-outline-primary').click();
	});

	it('delete', () => {
		cy.visit('/KIF');
		cy.get('tfoot > td:nth-child(11)').click();
		cy.get('tr:nth-child(3) .btn').click();
	});
});
