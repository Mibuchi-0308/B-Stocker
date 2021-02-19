import React from "react"
import PropTypes from "prop-types"

import ConfirModal from "./ConfirModal"

class FolderManager extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    modal: "close",
  };}

  handleClickInfo() {
    this.setState({modal: "info"});
  }

  handleClickClose() {
    this.setState({modal: "close"});
  }

  handleClickEdit() {
    this.setState({modal: "edit"});
  }

  handleClickDelete() {
    this.setState({modal: "delete"})
  }
  render () {
    let modal;
    let modalName;
    let modalButton;
    let modalTitle;

    //readOnlyのせいで基礎モーダルの使い回しが煩雑になるのでしない。できればしたいなあ。

    switch (this.state.modal) {
      case "info":
        modalName = "folderInfo";
        modalTitle = "フォルダ詳細";
        modalButton = (
          <div>
            <button onClick={() => this.handleClickEdit()}　className="edit" type="button">
              編集
            </button>
            <button onClick={() => this.handleClickClose()}　className="OK" type="button">
              OK
            </button>
          </div>
        );
        modal = (
          <div>
            <div className={modalName + "-modal"}>
              <div className={modalName + "-modal-inner"}>
                <div className={modalName + "-modal-header"}>
                  <p>{modalTitle}</p>
                  <img src="/assets/modal/close.png"
                       className="close-btn"
                       onClick={() => {this.handleClickClose()}}
                  />
                </div>
                <div className={modalName + "-modal-contents"}>
                  <p>フォルダ名</p>
                  <input name="folder_name" type="text"  defaultValue={this.props.name} readOnly />
                  <p>作成日</p>
                  <input name="folder_created_at" type="text" defaultValue={this.props.created_at} readOnly />
                </div>
                <div className={modalName + "-modal-button"}>
                  {modalButton}
                </div>
              </div>
            </div>
          </div>
        );
      break;
      case "edit":
        modalName = "editFolder";
        modalTitle = "編集";
        modalButton = (
          <div>
            <button onClick={() => this.handleClickInfo()} className="back" type="button">
              戻る
            </button>
            <button　 onClick={() => this.handleClickDelete()} className="delete" type="button">
              削除
            </button>
            <button className="OK" id={this.props.folderId + this.props.value} type="submit" formAction={"/folders/" + this.props.folderId + "/update"}>
              OK
            </button>
          </div>
        );
        modal = (
          <div>
            <div className={modalName + "-modal"}>
              <div className={modalName + "-modal-inner"}>
                <div className={modalName + "-modal-header"}>
                  <p>{modalTitle}</p>
                  <img src="/assets/modal/close.png"
                       className="close-btn"
                       onClick={() => {this.handleClickClose()}}
                  />
                </div>
                <div className={modalName + "-modal-contents"}>
                  <p>フォルダ名</p>
                  <input name="folder_name" type="text"  defaultValue={this.props.name} />
                  <p>作成日</p>
                  <input name="folder_created_at" type="text" defaultValue={this.props.created_at} readOnly />
                </div>
                <div className={modalName + "-modal-button"}>
                  {modalButton}
                </div>
              </div>
            </div>
          </div>
        );
      break;
      case "delete":
        modal = <ConfirModal
        name="削除"
        className="folderDelete"
        text={this.props.name + "を削除しますか？"}
        Id={this.props.folderId}
        value={this.props.value}
        />
      break;
      case "close":
        modal = "";
      break;
    }

    return (
      <div>
        <div onClick={()=>{this.handleClickInfo()}}>
          フォルダ詳細
        </div>
        {modal}
      </div>
    );
  }
}

export default FolderManager
