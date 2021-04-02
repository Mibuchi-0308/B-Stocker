import React from "react"
import PropTypes from "prop-types"
class OrderPassed extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    orderBooks: Array(),
    passed: Array(),
    unpassed: Array(),
  };}

  verificationSameBook(bookValue, status) {
    let includeSameBook;
    switch(status);
      case "yet":
        includeSameBook = this.state.passed.find((book) => {
          return (book.id === bookValue.id)
        });
        if (includeSameBook) {

        } else {

        }
  }

  handleClickChangeStatus(id, status) {
    let changeToPassed = this.state.passed.slice();
    let changeToUnpassed = this.state.unpassed.slice();

    let bookValue = this.props.orderBooks.find((book) => {
      return (book.id === id)
    });

    let includeSameBook = this.state.passed.find((book) => {
      return (book.id === bookValue.id)
    });

    switch (status) {
      case "yet":
        changeToPassed.push(bookValue);
        this.setState({passed: changeToPassed});
      break;
      case "passed":
        changeToUnpassed.push(bookValue);
        this.setState({unpassed: changeToUnpassed});
      break;
    }
  }



  render () {
    let orderBooks;
    let i_book;
    let p_book;
    let i = 0;

    i_book = this.props.i_books.map((book) => {
      return (
        <p key={book.id} onClick={() => {this.handleClickChangeStatus(book.id, "yet")}}>
          {book.name}
        </p>
      );
    })

    p_book = this.props.p_books.map((book) => {
      return (
        <p key={book.id} onClick={() => {this.handleClickChangeStatus(book.id, "passed")}}>
          {book.name}
        </p>
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
