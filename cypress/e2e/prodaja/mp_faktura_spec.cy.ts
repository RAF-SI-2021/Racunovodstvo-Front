describe('mp_faktura spec', () => {
	it('visit page', () => {
		cy.visit('/mp_faktura');
	});

	it('brisanje', () => {
		cy.get('.btn-danger').last().click();
	});

	it('nova faktura', () => {
		cy.get(
			'.row:nth-child(2) > .col-sm-3:nth-child(1) > .form-control'
		).type('999');
		cy.get(
			'.row:nth-child(2) > .col-sm-3:nth-child(2) > .form-control'
		).type('2022-06-13');
		cy.get('#komitent').select('0: Object');
		cy.get(
			'.row:nth-child(2) > .col-sm-3:nth-child(4) > .form-control'
		).type('2022-06-15');
		cy.get(
			'.row:nth-child(3) > .col-sm-3:nth-child(1) > .form-control'
		).type('2022-06-15');
		cy.get(
			'.row:nth-child(3) > .col-sm-3:nth-child(2) > .form-control'
		).type('10000');
		cy.get(
			'.row:nth-child(3) > .col-sm-3:nth-child(3) > .form-control'
		).type('10');
		cy.get('.row:nth-child(3) > .col-sm-3:nth-child(4)').type(
			'{backspace}10'
		);
		cy.get('.row:nth-child(4) > .col-sm-3:nth-child(1)').type('RSD');
		cy.get('.row:nth-child(4) > .col-sm-3:nth-child(2)').type('1');
		cy.get('.row:nth-child(4) > .col-sm-3:nth-child(3)').type('10000');
		cy.get('.row:nth-child(4) > .col-sm-3:nth-child(4)').type('komentar');
		cy.get('.btn-success').click();
	});
});
