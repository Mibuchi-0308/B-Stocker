import React from "react"
import PropTypes from "prop-types"

class Login extends React.Component {
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
    let login_modal;
    if (this.state.isModalOpen) {
      login_modal = (
        <div className="login-modal">
          <div className="login-modal-inner">
            <div className="login-modal-header">
              <p>ログイン</p>
              <img src="/assets/modal/close.png"
                   className="close-btn"
                   onClick={() => {this.handleClickClose()}}
              />
            </div>
            <div className="login-modal-contents">
              <p>ユーザー名</p>
              <input name="user_name" />
              <p>メールアドレス</p>
              <input type="email" name="email"/>
              <p>パスワード</p>
              <input type="password" name="password"/>
            </div>
            <div className="modal-button">
              <button className="create">
                新規登録
              </button>
              <button className="login" type="submit" id="login" formAction="/login">
                ログイン
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
            {login_modal}
        </div>
      );
  }
}

export default Login
