import { request } from '../core/api.js';
import { getItem } from '../core/storage.js';
import { routeChange } from '../core/router.js';
import Cart from '../components/Cart.js';

export default function CartPage({ $target }) {
  const $page = document.createElement('div');
  $page.classList = 'CartPage';
  $page.innerHTML = '<h1>장바구니</h1>';

  const cartData = getItem('products_cart', []);
  this.state = {
    products: null,
  };

  let cartComponent = null;

  this.render = () => {
    if (cartData.length === 0) {
      alert('장바구니가 비어있습니다.');
      routeChange('/');
    } else {
      $target.appendChild($page);
      if (this.state.products && !cartComponent) {
        cartComponent = new Cart({
          $target: $page,
          initialState: this.state.products,
        });
      }
    }
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.fetchProducts = async () => {
    console.log('여기실행');
    const products = await Promise.all(
      cartData.map(async (cartItem) => {
        const product = await request(`/products/${cartItem.productId}`);
        const selectedOption = product.productOptions.find(
          (option) => option.id === cartItem.optionId
        );

        return {
          imageUrl: product.imageUrl,
          productName: product.name,
          quantity: cartItem.quantity,
          productPrice: product.price,
          optionName: selectedOption.name,
          optionPrice: selectedOption.price,
        };
      })
    );
    this.setState({ products });
  };
  this.fetchProducts();
}
