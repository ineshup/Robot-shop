import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, robot-shop');
  });

  it('filters products from the search field', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const search = fixture.nativeElement.querySelector('#catalog-search') as HTMLInputElement;
    search.value = 'Atlas';
    search.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('.product-card');
    expect(cards).toHaveLength(1);
    expect(cards[0].textContent).toContain('Atlas Mini');
  });

  it('filters products by category and updates the cart count', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const category = Array.from(fixture.nativeElement.querySelectorAll('.category-button') as NodeListOf<HTMLButtonElement>)
      .find((button) => button.textContent?.includes('Workshop helpers'));
    category?.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.product-card')).toHaveLength(2);
    expect(category?.getAttribute('aria-pressed')).toBe('true');

    const addButton = fixture.nativeElement.querySelector('.add-button') as HTMLButtonElement;
    addButton.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.cart-count')?.textContent?.trim()).toBe('1');
  });
});
