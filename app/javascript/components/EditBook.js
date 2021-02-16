import React from "react"
import PropTypes from "prop-types"

import BookInfo from "./BookInfo"

class EditBook extends React.Component {
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

  handleClickInfo() {
    this.setState({modal: "info"});
  }

  render() {
    let editBook_modal;
    switch (this.state.modal) {
      case "open":
        editBook_modal = (
          <div className="editBook-modal">
            <div className="editBook-modal-inner">
              <div className="editBook-modal-header">
                <p>書籍編集</p>
                <img src="/assets/modal/close.png"
                     className="close-btn"
                     onClick={() => {this.handleClickClose()}}
                />
              </div>
              <div className="editBook-modal-contents">
                <p>フォルダ名</p>
                <input name="folder_name" type="text" defaultValue={this.props.folder_name} />
                <p>書籍名</p>
                <input name="book_name" type="text"  defaultValue={this.props.book_name} />
                <p>出来日</p>
                <input name="c_day" type="date" defaultValue={this.props.i_day} />
                <p>入荷日</p>
                <input name="i_day" type="date" defaultValue={this.props.c_day} />
                <p>入荷予定数</p>
                <input name="amount"type="number" defaultValue={this.props.amount} />
              </div>
              <div className="editBook-modal-button">
                  <button
                    onClick={() => this.handleClickInfo()}
                    className="delete"
                  >
                  戻る
                  </button>
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
        editBook_modal = "";
      break;
      case "info":
        this.handleClickClose();
      break;
    }

      return (
        <div>
          <p onClick={() => {this.handleClickOpen()}}>編集</p>
          {editBook_modal}
        </div>
      );
  }
}

export default EditBook
