import React from "react"
import PropTypes from "prop-types"
class Login extends React.Component {
  constructor(props) {
  super(props);
  this.state = {isModalOpen: false};
  }

  hanldeClickLogin() {
    this.setState({isModalOpen: true});
  }

  handleClickClose() {
    this.setState({isModalOpen: false})
  }

  render() {
    let modal;
    if (this.state.isModalOpen)
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
      </div>
    );
    return (
      <p>鯖の味噌煮です</p>
    );
  }
}

export default Login
