import React from "react"
import PropTypes from "prop-types"
class Login extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    isModalOpen: false,
    isTestOpen: false,
  };
  }

  handleClickOpen() {
    this.setState({isModalOpen: true});
  }

  handleClickClose() {
    this.setState({isModalOpen: false});
  }

  //handleClickTestOpen() {
    //this.setState({isTestOpen: !this.state.isTestOpen})
  //}

  render() {
    let modal;
    if (this.state.isModalOpen) {
      modal = (
        <div className="login-modal">
          <div className="modal-inner">
            <div className="modal-header">
              <p>ログイン</p>
              <img src="assets/modal/close.png"
                   className="close-btn"
                   onClick={() => {this.handleClickClose()}}
              />
            </div>
            <div className="modal-contents">
              <form>
              <p>メールアドレス</p>
              <input type="email" />
              <p>パスワード</p>
              <input type="password" />
              </form>
            </div>
            <div className="modal-button">
                <a className="create">新規登録</a>
                <a className="login">ログイン</a>
            </div>
          </div>
        </div>
      );}

      return (
        <div>
          <div
            className="hs-element"
            onClick={() => {this.handleClickOpen()}}>
            <p>ログイン</p>
            </div>
            {modal}
        </div>
      );
  }
}

export default Login
