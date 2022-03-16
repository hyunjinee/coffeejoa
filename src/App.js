import ProductListPage from './components/ProductListPage.js';
import ProductDetailPage from './components/ProductDetailPage.js';
import CartPage from './pages/CartPage.js';
import { init } from './core/router.js';

export default function App({ $target }) {
  init(this.route);
  this.route = () => {
    const { pathname } = location;
    console.log(pathname);
    $target.innerHTML = '';
    console.log(pathname);
    if (pathname === '/') {
      new ProductListPage({ $target }).render();
    } else if (pathname.indexOf('/products/') === 1) {
      console.log(pathname, '?');
      const [, , productId] = pathname.split('/');
      console.log('관심좀');
      new ProductDetailPage({ $target }).render();
    } else if (pathname === '/cart') {
      new CartPage({ $target }).render();
    }
  };

  this.route();
}
