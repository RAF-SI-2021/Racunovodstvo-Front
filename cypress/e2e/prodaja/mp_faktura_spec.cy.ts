describe('mp_faktura spec', () => {
	it('visit page', () => {
		cy.visit('/mp_faktura');
	});

	it('nova faktura', () => {
		cy.get(
			'.row:nth-child(2) > .col-sm-3:nth-child(1) > .form-control'
		).type('999');
		cy.get(
			'.row:nth-child(2) > .col-sm-3:nth-child(2) > .form-control'
		).type('2022-06-13');
		cy.get('#komitent').select(0);
		cy.get(
			'.row:nth-child(2) > .col-sm-3:nth-child(4) > .form-control'
		).type('2022-06-15');
		cy.get(
			'.row:nth-child(3) > .col-sm-3:nth-child(1) > .form-control'
		).type('{backspace}1000');
		cy.get(
			'.row:nth-child(3) > .col-sm-3:nth-child(2) > .form-control'
		).type('{backspace}10');
		cy.get(
			'.row:nth-child(3) > .col-sm-3:nth-child(3) > .form-control'
		).type('{backspace}20');
		cy.get('.row:nth-child(3) > .col-sm-3:nth-child(4)').type(
			'{backspace}10'
		);
		cy.get('#valuta').select(0);
		cy.get('textarea').type('komentar');
		cy.get('.btn-success').click();
	});

	it('brisanje', () => {
		cy.visit('/mp_faktura');
		cy.get('.btn-danger').last().click();
	});
});
