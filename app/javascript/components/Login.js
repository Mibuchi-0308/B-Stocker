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
              <p>メールアドレス</p>
              <input />
              <p>パスワード</p>
              <input />
            </div>
            <div className="modal-button">
                <button>新規登録</button>
                <button>ログイン</button>
            </div>
          </div>
        </div>
      );}

    //let message;
    //if (this.state.isTestOpen) {
      //message = (
        //<p>機能しちょる</p>
      //);
    //}

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
