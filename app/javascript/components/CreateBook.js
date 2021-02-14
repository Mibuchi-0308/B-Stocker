import React from "react"
import PropTypes from "prop-types"
class CreateBook extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    isModalOpen: false,
  };
  }

  handleClickOpen() {
    this.setState({isModalOpen: true});
  }

  handleClickClose() {
    this.setState({isModalOpen: false});
  }

  handleClickCreateUser() {
    this.setState({isModalOpen: false});
  }

  render() {
    let createBook_modal;
    if (this.state.isModalOpen) {
      createBook_modal = (
        <div className="createBook-modal">
          <div className="createBook-modal-inner">
            <div className="createBook-modal-header">
              <p>書籍登録</p>
              <img src="assets/modal/close.png"
                   className="close-btn"
                   onClick={() => {this.handleClickClose()}}
              />
            </div>
            <div className="createBook-modal-contents">
              <form>
                <p>フォルダ名</p>
                <input type="text" defaultValue={this.props.folder_name} readOnly/>
                <p>書籍名</p>
                <input type="text" />
                <p>出来日</p>
                <input type="date" />
                <p>入荷日</p>
                <input type="date" />
                <p>入荷予定数</p>
                <input type="number" />
              </form>
            </div>
            <div className="createBook-modal-button">
                <button
                  className="create"
                  onClick={() => {this.handleClickCreateUser()}}
                >
                新規作成
                </button>
            </div>
          </div>
        </div>
      );}

      return (
        <div>
          <div
            className="hs-element"
            onClick={() => {this.handleClickOpen()}}>
            <p>{this.props.name}</p>
            </div>
            {createBook_modal}
        </div>
      );
  }
}

export default CreateBook