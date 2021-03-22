import React from "react"
import PropTypes from "prop-types"

class UserPage extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    mode: "show",
    checkedPass: false,
  };
  }

//あと削除する際にパスワードを要求すべきでは？
  handleClickEdit() {
    this.setState({mode: "edit"});
  }

  handleClickDelete() {
    this.setState({mode: "delete"});
  }

  handleClickShow() {
    this.setState({mode: "show"});
  }

  handleChangeCheckPassword(pass) {
    if (pass === this.props.password) {
      this.setState({checkedPass: true});
    } else {
      this.setState({checkedPass: false});
    }
  }

  render() {
    let contents;
    let modal;
    let buttons;

    if (this.props.checked) {
      buttons = (
        <div className="userContents-buttons">
          <button onClick={() => this.handleClickDelete()}>アカウント削除</button>
          <button onClick={() => this.handleClickEdit()}>編集する</button>
        </div>
      );
    } else {
      buttons = (
        <div className="userContents-buttons">
          <button className="dammy">アカウント削除</button>
          <button className="dammy">編集する</button>
        </div>
      );
    }

    switch (this.state.mode) {
      case "show":
      modal = ""
      contents = (
        <div className="userContents-show">
          <p>ユーザーネーム</p>
          <input defaultValue={this.props.userName} readOnly/>
          <p>メールアドレス</p>
          <input defaultValue={this.props.email} readOnly/>
          <p>パスワード</p>
          <input defaultValue="secret" readOnly/>
          <p>パスワード認証</p>
          <input onChange={(event) => handleChangeCheckPassword(event.target.value)}/>
          {buttons}
        </div>
      );
      break;
      case "edit":
      modal = ""
      contents = (
        <div className="userContents-edit">
          <p>ユーザーネーム</p>
          <input defaultValue={this.props.userName} />
          <p>メールアドレス</p>
          <input defaultValue={this.props.email} />
          {buttons}
        </div>
      )
      break;
      case "delete":
      modal = (
        <div className="deleteUserModal-wrapper">
          <div className="deleteUserModal">
            <div className="deleteUserModal-Header">
              <p>確認</p>
            </div>
            <div className="deleteUserModal-Contents">
              <p>ユーザー名:{this.props.UserName}様
                <br>アカウントを削除します。</br>
                <br>全ての情報が消えますがよろしいですか？(フォルダ情報、書籍情報、顧客情報等)</br>
              </p>
            </div>
            <div className="deleteUserModal-Buttons">
              <button type="button" onClick={() => handleClickShow()}>戻る</button>
              <button className="delete" type="submit" from={`deleteUser_${this.props.userId}`}>アカウント削除</button>
            </div>
          </div>
        </div>
      )
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
