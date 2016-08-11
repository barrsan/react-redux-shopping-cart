import './CartRow.styl';
import React, { Component, PropTypes } from 'react';


class CartRow extends Component {
  static defaultProps = {
    blockName: 'cartRow',
  }

  static propTypes = {
    blockName: React.PropTypes.string.isRequired,
  }

  handleRemoveClick() {
    this.props.removeProduct(this.props.product.id);
  }

  handleDecrementClick() {
    if (this.props.product.quantity !== 1) {
      this.props.decrementProduct(this.props.product.id);
    } else {
      this.props.removeProduct(this.props.product.id);
    }
  }

  handleIncrementClick() {
    this.props.incrementProduct(this.props.product.id);
  }

  render() {
    const { blockName, product } = this.props;
    return (
      <div className={blockName}>
        <div className={`${blockName}__title`}>{product.title}</div>
        <div className={`${blockName}__quantity`}>
          <button
            className={`${blockName}__btnQuantity`}
            onClick={::this.handleDecrementClick}
          >-</button>
          <div className={`${blockName}__quantityNumber`}>{product.quantity}</div>
          <button
            className={`${blockName}__btnQuantity`}
            onClick={::this.handleIncrementClick}
          >+</button>
        </div>
        <div className={`${blockName}__cost`}>{product.cost} &#8381;</div>
        <button
          className={`${blockName}__btnRemove`}
          onClick={::this.handleRemoveClick}
        >Remove</button>
      </div>
    );
  }
}

CartRow.propTypes = {
  product: PropTypes.object.isRequired,
  removeProduct: PropTypes.func.isRequired,
  incrementProduct: PropTypes.func.isRequired,
  decrementProduct: PropTypes.func.isRequired,
};

export default CartRow;
