describe('cash-register spec', () => {
	it('visit page', () => {
		cy.visit('/cash-register');
	});

	it('brojTransakcije', () => {
		cy.get('#opcije').type('brojTransakcije');
		cy.get('#vrednost').type('1123L');
		cy.get('.btn:nth-child(5)').click();
		cy.get('.btn:nth-child(6)').click();
	});

	it('datumTransakcije', () => {
		cy.get('#opcije').type('datumTransakcije');
		cy.get('#vrednost').type('2022-06-13');
		cy.get('.btn:nth-child(5)').click();
		cy.get('.btn:nth-child(6)').click();
	});

	it('tipTransakcije', () => {
		cy.get('#opcije').type('tipTransakcije');
		cy.get('#vrednost').type('UPLATA');
		cy.get('.btn:nth-child(5)').click();
		cy.get('.btn:nth-child(6)').click();
	});

	it('iznos', () => {
		cy.get('#opcije').type('iznos');
		cy.get('#vrednost').type('222.33');
		cy.get('.btn:nth-child(5)').click();
		cy.get('.btn:nth-child(6)').click();
	});

	it('sadrzaj', () => {
		cy.get('#opcije').type('sadrzaj');
		cy.get('#vrednost').type('Sadrzaj');
		cy.get('.btn:nth-child(5)').click();
		cy.get('.btn:nth-child(6)').click();
	});

	it('sifraTransakcije', () => {
		cy.get('#opcije').type('sifraTransakcije');
		cy.get('#vrednost').type('1010');
		cy.get('.btn:nth-child(5)').click();
		cy.get('.btn:nth-child(6)').click();
	});

	it('komentar', () => {
		cy.get('#opcije').type('komentar');
		cy.get('#vrednost').type('komentar');
		cy.get('.btn:nth-child(5)').click();
		cy.get('.btn:nth-child(6)').click();
	});

	it('add to knjizenje widget', () => {
		cy.get('tr:nth-child(1) > .text-center > .btn').click();
		cy.get('#brojDok').should('contain', '1123L');
	});
});
