import React from "react"
import PropTypes from "prop-types"
class OrderPassed extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    orderBooks: Array(),
    passedItems: Array(),
  };}

  handleClickPassed(value) {
    const passedItems = this.state.passedItems.slice();
    let clicked = this.props.orderBooks.find((orderBook) => {
      return (orderBook.id === value)
    });

  }

  handleClickUnPassed(value) {

  }

  render () {
    let orderBooks;
    let i_book;
    let p_book;
    let i = 0;

    i_book = this.props.i_books.map((book) => {
      return (
        <p key={book.id}>{book.name}</p>
      );
    })

    p_book = this.props.p_books.map((book) => {
      return (
        <p key={book.id}>{book.name}</p>
      );
    })

    return (
      <div className="orderBooks">
        {i_book}
        {p_book}
        <p className="orderCount">合計{i}冊</p>
        <button type="button" className="dammy">お渡し済にする</button>
      </div>
    );
  }
}
export default OrderPassed
