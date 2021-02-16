import React from "react"
import PropTypes from "prop-types"

import EditBook from "./EditBook"

class BookInfo extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    modal: "close",
  };
  }

  handleClickOpen() {
    this.setState({modal: "open"});
  }

  handleClickClose() {
    this.setState({modal: "close"});
  }

  handleClickEdit() {
    this.setState({modal: "edit"});
  }

  render() {
    let bookInfo_modal;
    switch (this.state.modal) {
      case "open":
        bookInfo_modal = (
          <div className="book-modal">
            <div className="book-modal-inner">
              <div className="book-modal-header">
                <p>書籍情報</p>
                <img src="/assets/modal/close.png"
                     className="close-btn"
                     onClick={() => {this.handleClickClose()}}
                />
              </div>
              <div className="book-modal-contents">
                <p>フォルダ名</p>
                <input name="folder_name" type="text" defaultValue={this.props.folder_name} readOnly/>
                <p>書籍名</p>
                <input name="book_name" type="text"  defaultValue={this.props.book_name} readOnly/>
                <p>出来日</p>
                <input name="c_day" type="date" defaultValue={this.props.i_day} readOnly/>
                <p>入荷日</p>
                <input name="i_day" type="date" defaultValue={this.props.c_day} readOnly/>
                <p>入荷予定数</p>
                <input name="amount"type="number" defaultValue={this.props.amount} readOnly/>
              </div>
              <div className="book-modal-button">
                  <button
                    onClick={() => this.handleClickClose()}
                    className="OK"
                  >
                  OK
                  </button>
              </div>
            </div>
          </div>
        );
      break;
      case "close":
        bookInfo_modal = "";
      break;
      case "edit":
        handleClickClose();
      break;
    }

      return (
        <div>
          <div
            className="hs-element"
            onClick={() => {this.handleClickOpen()}}>
            <p>{this.props.book_name}</p>
            </div>
            {bookInfo_modal}
        </div>
      );
  }
}

export default BookInfo
