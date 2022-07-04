describe('konverzije spec', () => {
	it('visit page', () => {
		cy.visit('/konverzije');
	});

	it('dodaj konverziju', () => {
		// cy.get('input[ng-reflect-name="brojKonverzije"]').type('FFF');
		// cy.get('input[ng-reflect-name="datum"]').type('2022-06-13');
		// cy.get('select[ng-reflect-name="dobavljac"]').select('1');
		// cy.get('select[ng-reflect-name="lokacija"]').select('1');
		// cy.get('input[ng-reflect-name="adresaLokacije"]').type(
		// 	'Adresa lokacije'
		// );
		// cy.get('input[ng-reflect-name="nazivLokacije"]').type('Naziv lokacije');
		// cy.get('th > .btn').click();
		// cy.get('input[ng-reflect-name="naziv"]').type('Naziv troska');
		// cy.get('input[ng-reflect-name="cena"]').type('{backspace}10000');
		// cy.get('input[ng-reflect-name="valuta"]').type('RSD');
		// cy.get('textarea').type('komentar');
		// cy.get('.btn-primary').last().click();
		// zasto bi neko resio da obrise id :'(
		cy.get('.mt-3 > .btn').click();
		cy.get(
			'.row:nth-child(2) > .col-sm-4:nth-child(1) > .form-control'
		).type('999');
		cy.get(
			'.row:nth-child(2) > .col-sm-4:nth-child(2) > .form-control'
		).select(2);
		cy.get(
			'.row:nth-child(2) > .col-sm-4:nth-child(3) > .form-control'
		).type('2022-07-22');
		cy.get(
			'.row:nth-child(3) > .col-sm-4:nth-child(1) > .form-control'
		).select(0);
		cy.get('.col-sm-5:nth-child(1) > .form-control').type('Naziv troska');

		cy.get('.col-sm-5:nth-child(3) > .form-control').type(
			'{backspace}1000'
		);
		cy.get('.col-sm-5:nth-child(2) > .form-control').type('komentar');
		cy.get('.btn-success').last().click();
	});

	it('obrisi konverziju', () => {
		cy.get('.btn-danger').first().click();
	});

	it('fakturisi konverziju', () => {
		cy.get('.btn-primary:nth-child(1)').click();
		cy.get('.col-sm-4:nth-child(1) > .form-control').first().type('999');
		cy.get('.col-sm-4:nth-child(3) > .form-control').type('2022-07-05');
		cy.get('.col-sm-12 > .form-control').type('komentar fakturisanja');
		cy.get('.btn-outline-dark').click();
	});
});
