import React from "react"
import PropTypes from "prop-types"

class UserPage extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    mode: "show",
    checkedPass: false,
    modal: false,
  };
  }

//あと削除する際にパスワードを要求すべきでは？
  handleClickEdit() {
    this.setState({mode: "edit"});
  }

  handleClickDelete() {
    this.setState({modal: true});
  }

  handleClickShow() {
    this.setState({mode: "show", modal: false});
  }

  render() {
    let contents;
    let modal;
    let buttons;

    if (this.props.checked) {
      buttons = (
        <div className="userContents-buttons">
          <button className="delete" onClick={() => this.handleClickDelete()}>アカウント削除</button>
          <button className="edit" onClick={() => this.handleClickEdit()}>アカウント編集</button>
        </div>
      );
    } else {
      buttons = (
        <div className="userContents-buttons">
          <div className="passOfPassword">
            <p>パスワード認証</p>
            <input name="userPassword" form={`passOfPassword_${this.props.userId}`} />
            <button className="formal" type="submit" form={`passOfPassword_${this.props.userId}`}>認証する</button>
          </div>
          <img src="/assets/icons/lock.png"/>
          <button className="dammy" type="button">アカウント削除</button>
          <button className="dammy" type="button">アカウント編集</button>
        </div>
      );
    }

    switch (this.state.mode) {
      case "show":
      contents = (
        <div className="userContents">
          <p>ユーザーネーム</p>
          <input className="userInfo" defaultValue={this.props.userName} readOnly/>
          <p>メールアドレス</p>
          <input className="userInfo" defaultValue={this.props.email} readOnly/>
          <p>パスワード</p>
          <input className="userInfo" defaultValue="*****" readOnly/>
        </div>
      );
      break;
      case "edit":
      contents = (
        <div className="userContents">
          <p>ユーザーネーム</p>
          <input className="userInfo" name="userName" defaultValue={this.props.userName} form={`updateUser_${this.props.userId}`}/>
          <p>メールアドレス</p>
          <input className="userInfo" name="email" defaultValue={this.props.email} form={`updateUser_${this.props.userId}`}/>
          {/*パスワードにshow状態のvalueが入ったままになっている問題*/}
          <p>パスワード</p>
          <input className="userInfo" name="newPassword1" type="password" form={`updateUser_${this.props.userId}`}/>
          <p>パスワード(再確認)</p>
          <input className="userInfo" name="newPassword2" type="password" form={`updateUser_${this.props.userId}`}/>
        </div>
      );
      buttons = (
        <div className="userContents-buttons">
          <button className="edit" onClick={() => this.handleClickEdit()} form={`updateUser_${this.props.userId}`}>編集完了</button>
        </div>
      );
      break;
    }

    if (this.state.modal) {
      modal = (
        <div className="deleteUserModal-wrapper">
          <div className="deleteUserModal">
            <div className="deleteUserModal-inner">
              <div className="deleteUserModal-header">
                <p>確認</p>
              </div>
              <div className="deleteUserModal-contents">
                <p>ユーザー名:{this.props.userName}様 の</p>
                <p>アカウントを削除します。</p>
                <p>全ての情報が削除されますがよろしいですか？</p>
                <p className="example">(フォルダ情報、書籍情報、顧客情報等)</p>
                <input className="password" name="userPassword" type="password" form={`deleteUser_${this.props.userId}`} />
              </div>
              <div className="deleteUserModal-button">
                <button  className="OK" type="button" onClick={() => this.handleClickShow()}>戻る</button>
                <button className="delete" type="submit" form={`deleteUser_${this.props.userId}`}>アカウント削除</button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="userContents-wrapper">
        {contents}
        {buttons}
        </div>
        {modal}
      </div>
    );
  }
}

export default UserPage
