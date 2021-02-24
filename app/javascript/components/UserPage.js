import React from "react"
import PropTypes from "prop-types"

import ConfirModal from "./ConfirModal"

class UserPage extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    mode: "show",
    modal: false};
  }

  handleClickEdit() {
    this.setState({mode: "edit"});
  }

//二度押ししないと削除モーダルをもう一度開くことが出来ない問題。あと削除する際にパスワードを要求すべきでは？
  handleClickDelete() {
    this.setState({modal: !this.state.modal});
  }

  render() {
    let contents;
    let modal;

    switch (this.state.mode) {
      case "show":
      contents = (
        <div className="userContents-show">
          <p>ユーザーネーム</p>
          <input defaultValue={this.props.userName} readOnly/>
          <p>メールアドレス</p>
          <input defaultValue={this.props.email} readOnly/>
          <div className="userContents-button">
            <button onClick={() => this.handleClickDelete()}>アカウント削除</button>
            <button onClick={() => this.handleClickEdit()}>編集する</button>
          </div>
        </div>
      );
      break;
      case "edit":
      contents = (
        <div className="userContents-edit">
          <p>ユーザーネーム</p>
          <input defaultValue={this.props.userName} />
          <p>メールアドレス</p>
          <input defaultValue={this.props.email} />
          <div className="userContents-button">
            <button onClick={() => this.handleClickDelete()}>アカウント削除</button>
            <button onClick={() => this.handleClickEdit()}>編集する</button>
          </div>
        </div>
      )
      break;
    }

    if (this.state.modal) {
      modal = (<ConfirModal
      name="削除"
      className="userDelete"
      text={this.props.userName + "を削除しますか？"}
      Id={this.props.userId}
      value={this.props.value}
      />);
    }

    return (
      <div>
        <div className="userContents-wrapper">
        {contents}
        </div>
        {modal}
      </div>
    );
  }
}

export default UserPage
