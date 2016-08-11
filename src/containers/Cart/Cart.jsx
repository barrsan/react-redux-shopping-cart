import './Cart.styl';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  addProduct,
  removeProduct,
  incrementProduct,
  decrementProduct,
  toggleCart,
  fetchProducts,
} from '../../actions/actions';

import CartRow from '../../components/CartRow/CartRow.jsx';


class Cart extends Component {
  static defaultProps = {
    blockName: 'cart',
  }

  static propTypes = {
    blockName: React.PropTypes.string.isRequired,
  }

  constructor() {
    super();
    this.listener = '';
  }

  componentDidMount() {
    this.props.fetchProducts();
    this.props.ee.on('addCart', this.listener = (id) => {
      this.props.addProduct(id);
    });
  }

  componentWillUnmount() {
    this.props.ee.off('addCart', this.listener);
  }

  handleToggleCart() {
    this.props.toggleCart();
  }


  render() {
    const { blockName, counter, total, products, opened } = this.props;
    const cartFullClass =
      opened ? `${blockName}__full` : `${blockName}__full ${blockName}__full_hide`;

    return (
      <div className={blockName}>
        <button
          className={`${blockName}__btn`}
          onClick={::this.handleToggleCart}
        >
          <span className={`${blockName}__info`}>{counter} itm. /
            <span className={`${blockName}__total`}>{total} &#8381;</span>
          </span>
        </button>
        <div className={cartFullClass}>
          <div className={`${blockName}__panel ${blockName}__panel_top`}>
            <h3 className={`${blockName}__title`}>Shopping Cart</h3>
            <button
              className={`${blockName}__btnClose`}
              onClick={::this.handleToggleCart}
            >Close</button>
          </div>
          {
            products.length > 0 ?
              products.map(item =>
                <CartRow
                  key={item.id}
                  product={item}
                  removeProduct={id => this.props.removeProduct(id)}
                  incrementProduct={id => this.props.incrementProduct(id)}
                  decrementProduct={id => this.props.decrementProduct(id)}
                />
            ) : <div className={`${blockName}__emptyMessage`}>Cart is empty</div>
          }
          <div className={`${blockName}__panel ${blockName}__panel_bottom`}>
            <a className={`${blockName}__checkout`} href="#">Checkout</a>
            <div className={`${blockName}__totalWrap`}>
              Total: <span className={`${blockName}__total`}>{total} &#8381;</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  ee: PropTypes.object.isRequired,
  counter: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  opened: PropTypes.bool.isRequired,
  products: PropTypes.array.isRequired,
  addProduct: PropTypes.func.isRequired,
  removeProduct: PropTypes.func.isRequired,
  incrementProduct: PropTypes.func.isRequired,
  decrementProduct: PropTypes.func.isRequired,
  toggleCart: PropTypes.func.isRequired,
  fetchProducts: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    counter: state.cart.counter,
    total: state.cart.total,
    products: state.cart.entities.products,
    opened: state.cart.opened,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addProduct,
    removeProduct,
    incrementProduct,
    decrementProduct,
    toggleCart,
    fetchProducts,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
