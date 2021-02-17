import React from "react"
import PropTypes from "prop-types"

import BookInfo from "./BookInfo"
import EditBook from "./EditBook"

class BookManager extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    modal: "close",
  };}

  handleClickInfo() {
    this.setState({modal: "info"});
  }

  handleClickClose() {
    this.setState({modal: "close"});
  }

  handleClickEdit() {
    this.setState({modal: "edit"});
  }

  render () {
    let modal;
    switch (this.state.modal) {
      case "info":
        modal = (
          <BookInfo
            book_name={this.props.book_name}
            folder_name={this.props.folder_name}
            c_day={this.props.c_day}
            i_day={this.props.i_day}
            amount={this.props.amount}
          />
        );
      break;
      case "edit":
        modal = (
          <EditBook
            book_name={this.props.book_name}
            folder_name={this.props.folder_name}
            c_day={this.props.c_day}
            i_day={this.props.i_day}
            amount={this.props.amount}
          />
        );
      break;
      case "close":
        modal = "";
      break;
    }

    return (
      <div>
        <div onClick={()=>{this.handleClickInfo()}}>
          {this.props.book_name}
        </div>
        {modal}
      </div>
    );
  }
}

export default BookManager
