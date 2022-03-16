import ProductListPage from './components/ProductListPage.js';
import ProductDetailPage from './components/ProductDetailPage.js';
import CartPage from './pages/CartPage.js';
import { init } from './core/router.js';

export default function App({ $target }) {
  init(this.route);
  this.route = () => {
    const { pathname } = location;
    $target.innerHTML = '';
    if (pathname === '/') {
      new ProductListPage({ $target }).render();
    } else if (pathname.indexOf('/products/') === 1) {
      const [, , productId] = pathname.split('/');
      new ProductDetailPage({ $target }).render();
    } else if (pathname === '/cart') {
      new CartPage({ $target }).render();
    }
  };

  this.route();
}
