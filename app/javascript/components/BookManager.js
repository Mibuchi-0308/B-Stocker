import React from "react"
import PropTypes from "prop-types"

import ConfirModal from "./ConfirModal"

class BookManager extends React.Component {
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
        modalName = "bookInfo";
        modalTitle = "書籍詳細";
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
                <p>書籍名</p>
                <input name="book_name" type="text"  defaultValue={this.props.name} readOnly/>
                <p>所属フォルダ</p>
                <input name="folder_name" type="text" defaultValue={this.props.folder_name} readOnly/>
                <p>出来日</p>
                <input name="c_day" type="date" defaultValue={this.props.c_day} readOnly/>
                <p>入荷日</p>
                <input name="i_day" type="date" defaultValue={this.props.i_day} readOnly/>
                <p>入荷予定数</p>
                <input name="amount"type="number" defaultValue={this.props.amount} readOnly/>
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
        modalName = "editBook";
        modalTitle = "編集";
        modalButton = (
          <div>
            <button onClick={() => this.handleClickInfo()} className="back" type="button">
              戻る
            </button>
            <button　 onClick={() => this.handleClickDelete()} className="delete" type="button">
              削除
            </button>
            <button className="OK" id={this.props.bookId + this.props.value} type="submit" formAction={"/folders/" + this.props.bookId + "/updateBook"}>
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
                  <p>書籍名</p>
                  <input name="book_name" type="text"  defaultValue={this.props.name} />
                  <p>所属フォルダ</p>
                  <input name="folder_name" type="text" defaultValue={this.props.folder_name} readOnly/>
                  <p>出来日</p>
                  <input name="c_day" type="date" defaultValue={this.props.c_day} />
                  <p>入荷日</p>
                  <input name="i_day" type="date" defaultValue={this.props.i_day} />
                  <p>入荷予定数</p>
                  <input name="amount"type="number" defaultValue={this.props.amount} />
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
        className="bookDelete"
        text={this.props.name + "を削除しますか？"}
        Id={this.props.bookId}
        value={this.props.value}
        />
      break;
      case "close":
        modal = "";
      break;
    }

    return (
      <div className="bookValue">
        <div className="touch" onClick={()=>{this.handleClickInfo()}}>
          {this.props.name}
        </div>
        {modal}
      </div>
    );
  }
}

export default BookManager
