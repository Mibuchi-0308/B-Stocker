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
          <h2>ログイン</h2>
            <ul>
              <li>メールアドレス</li>
              <li><input /></li>
              <li>パスワード</li>
              <li><input /></li>
            </ul>
            <button>新規登録</button>
            <button>ログイン</button>
            <button onClick={() => {this.handleClickClose()}}>
              とじる
            </button>
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
