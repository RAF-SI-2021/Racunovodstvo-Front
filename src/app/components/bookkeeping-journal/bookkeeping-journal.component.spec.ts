import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookkeepingJournalService } from '../../services/bookkeeping-journal/bookkeeping-journal.service';
import { BookkeepingJournal } from 'src/app/shared/bookkeeping-journal.model';
import { BookkeepingJournalComponent } from './bookkeeping-journal.component';

describe('Testing knjizenja component', () => {
	let component: BookkeepingJournalComponent;
	let fixture: ComponentFixture<BookkeepingJournalComponent>;
	let service: BookkeepingJournalService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HttpClientModule],
			declarations: [BookkeepingJournalComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BookkeepingJournalComponent);
		component = fixture.componentInstance;
		service = fixture.debugElement.injector.get(BookkeepingJournalService);
		fixture.detectChanges();
	});

	it('should create Knjizenje', () => {
		let app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	});

	it('should set UzetOd to be true', () => {
		component.odChanged();
		expect(component.uzetOd).toBe(true);
	});

	it('should od field be type of Date', () => {
		expect(component.od instanceof Date).toBe(true);
	});

	it('should knjizenje entity be set on html', () => {
		let knjizenje = new BookkeepingJournal(
			1,
			'111',
			new Date(),
			15,
			15,
			1,
			0,
			'test'
		);
		component.knjizenja.push(knjizenje);
		fixture.detectChanges();
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('#brojNaloga').textContent).toContain(
			knjizenje.brojNaloga
		);
	});
});
