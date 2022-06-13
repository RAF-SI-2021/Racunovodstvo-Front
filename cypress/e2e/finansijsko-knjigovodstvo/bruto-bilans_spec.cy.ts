describe('bruto-bilans spec', () => {
	it('visit page', () => {
		cy.visit('/bruto-bilans');
	});

	it('pretrazi', () => {
		cy.get('#kontoOd').type('0{upArrow}{downArrow}{enter}');
		cy.get('#kontoDo').type('302{downArrow}{enter}');

		cy.get('.mat-start-date').type('6/6/2022');
		cy.get('.mat-end-date').type('6/20/2022');

		cy.get(
			'.mat-focus-indicator:nth-child(2) > .mat-button-wrapper'
		).click();
	});

	it('stampaj', () => {
		cy.get(
			'.mat-focus-indicator:nth-child(5) > .mat-button-wrapper'
		).click();
	});

	it('stampaj bilans uspeha', () => {
		cy.visit('/bruto-bilans');
		cy.get(
			'app-bilans-stanja-uspeha:nth-child(4) .col-sm-2:nth-child(2) > .btn'
		).click();
		cy.get('#name').type('naziv');
		cy.get('#datum1').type('2022-06-06');
		cy.get('#datum2').type('2022-06-20');
		cy.get('div:nth-child(1) > .btn').click();
	});

	it('stampaj bilans stanja', () => {
		cy.visit('/bruto-bilans');
		cy.get(
			'app-bilans-stanja-uspeha:nth-child(4) .col-sm-2:nth-child(3) > .btn'
		).click();
		cy.get('#name').type('naziv');
		cy.get('#datum1').type('2022-06-06');
		cy.get('#datum2').type('2022-06-20');
		cy.get('div:nth-child(1) > .btn').click();
	});
});
