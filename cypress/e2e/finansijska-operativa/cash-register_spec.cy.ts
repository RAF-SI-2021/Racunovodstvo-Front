describe('cash-register spec', () => {
	it('visit page', () => {
		cy.visit('/cash-register');
	});

	it('brojTransakcije', () => {
		cy.get('#opcije').select('brojTransakcije');
		cy.get('#vrednost').type('1123');
		cy.get('.btn:nth-child(5)').click();
		cy.get('.btn:nth-child(6)').click();
	});

	it('datumTransakcije', () => {
		cy.get('#opcije').select('datumTransakcije');
		cy.get('#vrednost').type('2022-06-13');
		cy.get('.btn:nth-child(5)').click();
		cy.get('.btn:nth-child(6)').click();
	});

	it('tipTransakcije', () => {
		cy.get('#opcije').select('tipTransakcije');
		cy.get('#vrednost').type('UPLATA');
		cy.get('.btn:nth-child(5)').click();
		cy.get('.btn:nth-child(6)').click();
	});

	it('iznos', () => {
		cy.get('#opcije').select('iznos');
		cy.get('#vrednost').type('222.33');
		cy.get('.btn:nth-child(5)').click();
		cy.get('.btn:nth-child(6)').click();
	});

	it('sadrzaj', () => {
		cy.get('#opcije').select('sadrzaj');
		cy.get('#vrednost').type('Sadrzaj');
		cy.get('.btn:nth-child(5)').click();
		cy.get('.btn:nth-child(6)').click();
	});

	it('sifraTransakcije', () => {
		cy.get('#opcije').select('sifraTransakcije');
		cy.get('#vrednost').type('1010');
		cy.get('.btn:nth-child(5)').click();
		cy.get('.btn:nth-child(6)').click();
	});

	it('komentar', () => {
		cy.get('#opcije').select('komentar');
		cy.get('#vrednost').type('komentar');
		cy.get('.btn:nth-child(5)').click();
		cy.get('.btn:nth-child(6)').click();
	});

	// it('add to knjizenje widget', () => {
	// 	cy.get('tr:nth-child(1) > .text-center > .btn').click();
	// 	cy.get('#brojDok').should('have.value', '1123L');
	// });
});
