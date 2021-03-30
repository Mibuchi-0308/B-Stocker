import React from "react"
import PropTypes from "prop-types"
class OrderPassed extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    passedItems: Array(),
  };}

  handleClickPassed(value) {
    const newPassedItems = this.state.passedItems.slice();
    let clicked = this.props.books.find((book) => {
      return (book.id === value)
    });
  }

  handleClickUnPassed(value) {

  }

  render () {
    let orderBooksValue;
    let orderBook;
    let i = 0;

    let pureFind = pure.find((book) => {
      return (book.id === value );
    });

    orderBooksValue = this.props.orders.map((order) => {
      orderBook = this.props.book.find((book) => {
        return (book.id === order.book_id);
      });
      i ++;
      return (
        <p onClick={() => handleClickPassed(orderBook.id)}>{orderBook.name}</p>
    )});

    return (
      <div className="orderBooks">
        {orderBooksValue}
        <p class="orderCount">合計: {i}冊</p>
      </div>
    );
  }
}
export default OrderPassed
