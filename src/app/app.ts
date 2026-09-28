import { Component, computed, signal } from '@angular/core';

interface RobotProduct {
  name: string;
  category: string;
  description: string;
  price: number;
  accent: string;
  image: string;
  badge?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('robot-shop');
  protected readonly searchTerm = signal('');
  protected readonly selectedCategory = signal('All robots');
  protected readonly cartCount = signal(0);

  protected readonly products: RobotProduct[] = [
    {
      name: 'Milo Scout',
      category: 'Home companions',
      description: 'A curious little rover for reminders, music, and late-night company.',
      price: 249,
      accent: '#e9b949',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=85',
      badge: 'New'
    },
    {
      name: 'Atlas Mini',
      category: 'Workshop helpers',
      description: 'Compact lifting power and precise hands for projects around the house.',
      price: 899,
      accent: '#6d8dff',
      image: 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&w=900&q=85',
      badge: 'Best seller'
    },
    {
      name: 'Kiko Care',
      category: 'Home companions',
      description: 'A gentle wellness assistant that keeps routines feeling human.',
      price: 579,
      accent: '#db7c66',
      image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=900&q=85'
    },
    {
      name: 'Rivet 04',
      category: 'Workshop helpers',
      description: 'A durable utility bot built for repetitive tasks and rough edges.',
      price: 1240,
      accent: '#74b8a0',
      image: 'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?auto=format&fit=crop&w=900&q=85'
    }
  ];

  protected readonly categories = computed(() => [
    'All robots',
    ...new Set(this.products.map((product) => product.category))
  ]);

  protected readonly filteredProducts = computed(() => {
    const searchTerm = this.searchTerm().trim().toLowerCase();
    const category = this.selectedCategory();

    return this.products.filter((product) => {
      const matchesCategory = category === 'All robots' || product.category === category;
      const matchesSearch = !searchTerm || `${product.name} ${product.description}`.toLowerCase().includes(searchTerm);
      return matchesCategory && matchesSearch;
    });
  });

  protected updateSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  protected addToCart(): void {
    this.cartCount.update((count) => count + 1);
  }
}
