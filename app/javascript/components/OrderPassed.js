import React from "react"
import PropTypes from "prop-types"
class OrderPassed extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    orderBooks: Array(),
    passed: this.props.p_books,
    unpassed: this.props.i_books,
  };}

  verificationSameBook(bookValue, status) {
    let includeSameBook;
    switch (status) {
      case "yet":
        includeSameBook = this.state.passed.find((book) => {
          return (book.id === bookValue.id)
        });
        if (includeSameBook) {

        } else {

        }
      }
  }

  handleClickChangeStatus(id, status) {
    let changeToPassed = this.state.passed.slice();
    let changeToUnpassed = this.state.unpassed.slice();

    let bookValue = this.props.orderBooks.find((book) => {
      return (book.id === id)
    });

    let includeSamePassedBook = this.state.passed.find((book) => {
      return (book.id === bookValue.id)
    });

    if (includeSamePassedBook) {
      //お渡し済である(passedである)場合
      //自分以外を未お渡し済に定義
      let unClicked = this.state.passed.filter((book) => {
        return (book.id !== bookValue.id)
      });
      changeToUnpassed.push(bookValue)
      this.setState({passed: unClicked, unpassed: changeToUnpassed});
    } else {
      let unClicked = this.state.unpassed.filter((book) => {
        return (book.id !== bookValue.id)
      });
      changeToPassed.push(bookValue);
      this.setState({passed: changeToPassed, unpassed: unClicked});
    }
  }


  render () {
    let orderBooks;
    let i_book;
    let p_book;
    let i = 0;

    i_book = this.state.unpassed.map((book) => {
      return (
        <p key={book.id} onClick={() => {this.handleClickChangeStatus(book.id, book.passed)}}>
          {book.name}
        </p>
      );
    })

    p_book = this.state.passed.map((book) => {
      return (
        <p key={book.id} onClick={() => {this.handleClickChangeStatus(book.id, book.passed)}}>
        <s>
          {book.name}
        </s>
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
