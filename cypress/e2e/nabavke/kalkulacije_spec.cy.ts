describe('kalkulacije spec', () => {
	it('visit page', () => {
		cy.visit('/kalkulacije');
	});

	it('filter broj kalkulacije', () => {
		cy.visit('/kalkulacije');
		cy.get(
			'.row:nth-child(1) > .col-sm-3:nth-child(1) > .form-control'
		).type('AAA');
		cy.get('.btn-success').first().click();
	});

	it('filter datum', () => {
		cy.visit('/kalkulacije');
		cy.get(
			'.row:nth-child(1) > .col-sm-3:nth-child(2) > .form-control'
		).type('2022-06-10');
		cy.get(
			'.row:nth-child(1) > .col-sm-3:nth-child(3) > .form-control'
		).type('2022-06-15');
		cy.get('.btn-success').first().click();
	});

	it('filter dobavljac', () => {
		cy.visit('/kalkulacije');
		cy.get(
			'.row:nth-child(1) > .col-sm-3:nth-child(4) > .form-control'
		).type('2');
		cy.get('.btn-success').first().click();
	});

	it('filter lokacija', () => {
		cy.visit('/kalkulacije');
		cy.get(
			'.row:nth-child(2) > .col-sm-3:nth-child(1) > .form-control'
		).type('6: Object');
		cy.get('.btn-success').first().click();
	});

	it('filter nabavna vrednost', () => {
		cy.visit('/kalkulacije');
		cy.get(
			'.row:nth-child(2) > .col-sm-3:nth-child(2) > .form-control'
		).type('100');
		cy.get(
			'.row:nth-child(2) > .col-sm-3:nth-child(3) > .form-control'
		).type('300');
		cy.get('.btn-success').first().click();
	});

	it('filter komentar', () => {
		cy.visit('/kalkulacije');
		cy.get(
			'.row:nth-child(2) > .col-sm-3:nth-child(4) > .form-control'
		).type('komentar');
		cy.get('.btn-success').first().click();
	});

	it('filter prodajna vrednost', () => {
		cy.visit('/kalkulacije');
		cy.get(
			'.row:nth-child(3) > .col-sm-3:nth-child(1) > .form-control'
		).type('400');
		cy.get(
			'.row:nth-child(3) > .col-sm-3:nth-child(2) > .form-control'
		).type('500');
		cy.get('.btn-success').first().click();
	});

	it('fakturisi', () => {
		cy.get('.btn-primary').last().click();
		cy.get(
			'.row:nth-child(2) > .col-sm-4:nth-child(1) > .form-control'
		).type('959595');
		cy.get('.btn-outline-dark').click();
	});

	it('nova kalkulacija', () => {
		cy.get('.btn-success').last().click();
		cy.get(
			'.row:nth-child(2) > .col-sm-4:nth-child(1) > .form-control'
		).type('FFF');
		cy.get(
			'.row:nth-child(2) > .col-sm-4:nth-child(2) > .form-control'
		).select('VELEPRODAJA');
		cy.get(
			'.row:nth-child(2) > .col-sm-4:nth-child(3) > .form-control'
		).type('2022-07-13');
		cy.get(
			'.row:nth-child(3) > .col-sm-4:nth-child(1) > .form-control'
		).select('1');
		cy.get(
			'.row:nth-child(3) > .col-sm-4:nth-child(2) > .form-control'
		).select(1);
		cy.get(
			'.row:nth-child(3) > .col-sm-4:nth-child(3) > .form-control'
		).select(0);
		cy.get('.col-sm-5:nth-child(1) > .form-control').type('Naziv troska');
		cy.get('.col-sm-5:nth-child(3) > .form-control')
			.type('{backspace}1000')
			.trigger('change');
		cy.get('.col-sm-5:nth-child(2) > .form-control').type('komentar');
		cy.get('.col-sm-4 > .btn-success').click();
	});

	it('obrisi', () => {
		cy.get('.btn-danger').last().click();
	});
});
