import React from "react"
import PropTypes from "prop-types"
class CreateUser extends React.Component {
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

  render() {

    let createUser_modal;
    if (this.state.isModalOpen) {
      createUser_modal = (
        <div className="createUser-modal">
          <div className="createUser-modal-inner">
            <div className="createUser-modal-header">
              <p>新規登録</p>
              <img src="assets/modal/close.png"
                   className="close-btn"
                   onClick={() => {this.handleClickClose()}}
              />
            </div>
            <div className="createUser-modal-contents">
              <form>
              <p>メールアドレス</p>
              <input type="email" />
              <p>パスワード</p>
              <input type="password" />
              </form>
            </div>
            <div className="modal-button">
                <button className="login">ログイン</button>
                <button className="create">新規登録</button>
            </div>
          </div>
        </div>
      );}

      return (
        <div>
          <div
            className="hs-element"
            onClick={() => {this.handleClickOpen()}}
          >
            <p>{this.props.name}</p>
            </div>
            {createUser_modal}
        </div>
      );
  }
}

export default CreateUser
