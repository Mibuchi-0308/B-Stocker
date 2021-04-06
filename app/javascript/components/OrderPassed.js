import React from "react"
import PropTypes from "prop-types"
class OrderPassed extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    passed: this.props.p_books,
    unpassed: this.props.i_books,
    flagOfChanged: false,
  };}

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
      //並び替え
      changeToUnpassed.sort((a,b) =>{
        if (a.folder_id < b.folder_id) return -1;
        if (a.folder_id > b.folder_id) return 1;

        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;

      });
      this.setState({passed: unClicked, unpassed: changeToUnpassed, flagOfChanged: true});
    } else {
      let unClicked = this.state.unpassed.filter((book) => {
        return (book.id !== bookValue.id)
      });
      changeToPassed.push(bookValue);
      //並び替え
      changeToPassed.sort((a,b) =>{
        if (a.folder_id < b.folder_id) return -1;
        if (a.folder_id > b.folder_id) return 1;

        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;

      });
      this.setState({passed: changeToPassed, unpassed: unClicked, flagOfChanged: true});
    }
  }


  render () {
    let orderBooks;
    let i_book;
    let p_book;
    let button;

    let count = this.props.orders.length;
    let upCount = this.state.unpassed.length;

    i_book = this.state.unpassed.map((book) => {
      return (
        <input
          className="unpassedBook"
          name="unpassedBooks[]"
          key={book.id}
          onClick={() => {this.handleClickChangeStatus(book.id, book.passed)}}
          defaultValue={book.name}
          form={`updatePassedStatus_${this.props.customer_id}`} />
      );
    })

    p_book = this.state.passed.map((book) => {
      return (
        <input
          className="passedBook"
          name="passedBooks[]"
          key={book.id}
          onClick={() => {this.handleClickChangeStatus(book.id, book.passed)}}
          defaultValue={book.name}
          form={`updatePassedStatus_${this.props.customer_id}`} />
      );
    })

    if (this.state.flagOfChanged) {
      button = (
      <button type="submit" className="create" form={`updatePassedStatus_${this.props.customer_id}`}>
        変更する
      </button>
      );
    } else {
      button = (
      <button type="button" className="dammy">
        変更する
      </button>
      );
    }

    return (
      <div className="orderBooks">
        {i_book}
        {p_book}
        <p className="orderCount">未完了{upCount}/{count}冊</p>
        {button}
      </div>
    );
  }
}
export default OrderPassed
