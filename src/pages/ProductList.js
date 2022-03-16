import { request } from '../core/api.js';
import ProductList from '../components/ProductList.js';

export default function ProductListPage({ $target }) {
  const $page = document.createElement('div');
  $page.className = 'ProductListPage';
  $page.innerHTML = '<h1>상품 목록</h1>';

  this.render = () => {
    $target.innerHTML = '';
    $target.appendChild($page);
    new ProductList({ $target: $page, initialState: this.state });
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const fetchProducts = async () => {
    const products = await request('/products');
    this.setState(products);
    return products;
  };

  fetchProducts();
}
