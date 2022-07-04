describe('zaposleni spec', () => {
	beforeEach('visit page', () => {
		cy.visit('/zaposleni');
	});

	it('filter ime', () => {
		cy.get(
			'.row:nth-child(1) > .col-sm-6:nth-child(1) > .form-control'
		).type('Marko');
		cy.get('.btn-primary').last().click();
	});

	it('filter prezime', () => {
		cy.get(
			'.row:nth-child(2) > .col-sm-6:nth-child(1) > .form-control'
		).type('Peric');
		cy.get('.btn-primary').last().click();
	});

	it('filter radno mesto', () => {
		cy.get(
			'.row:nth-child(1) > .col-sm-6:nth-child(2) > .form-control'
		).select('DIREKTOR');
		cy.get('.btn-primary').last().click();
	});

	it('filter status', () => {
		cy.get(
			'.row:nth-child(2) > .col-sm-6:nth-child(2) > .form-control'
		).select('NEZAPOSLEN');
		cy.get('.btn-primary').last().click();
	});

	it('kreiraj zaposlenog', () => {
		cy.get('.col-sm-4:nth-child(1) > .form-control').type('Ime');
		cy.get('.col-sm-4:nth-child(2) > .form-control').type('Prezime');
		cy.get('.col-sm-4:nth-child(3) > .ng-untouched').type('2022-06-13');
		cy.get('.col-sm-3:nth-child(1) > .form-control').type('1234567891234');
		cy.get('.col-sm-3:nth-child(2) > .form-control').select('MUSKO');
		cy.get('.col-sm-3:nth-child(3) > .form-control').select(0);
		cy.get('.col-sm-3:nth-child(4) > .ng-untouched').select('MENADZER');
		cy.get('.btn-success').click();
	});

	it('izmeni profil zaposlenog', () => {
		cy.visit('/zaposleni/6');
		cy.get('.row:nth-child(1) > .col-md-3:nth-child(3) .form-control').type(
			'Roditelj'
		);
		cy.get('.row:nth-child(6) > .col-md-6 .form-control').type('Adresa');
		cy.get('.row:nth-child(6) > .col-md-3:nth-child(2) .form-control').type(
			'Grad'
		);
		cy.get('.row:nth-child(7) > .col-md-9 .form-control').type('123456789');
		cy.get('.row:nth-child(7) > .col-md-3 .form-control').type('VII');
		cy.get('.row:nth-child(8) > .col-md-8 .form-control').type('321654987');
		cy.get('#txtArea').type('komentar');
		cy.get('.btn-primary').last().click();
		//plata
		cy.get('.form-outline:nth-child(2) > .form-control').type('100000');
		cy.get('.btn-danger').click();
	});
});
