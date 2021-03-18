import React from "react"
import PropTypes from "prop-types"
class ConfirModal extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    modal: true,
  };}

  handleClickOpen() {
    this.setState({modal: true});
  }

  handleClickClose() {
    this.setState({modal: false});
  }

  render () {
    let modal;
    let visible;
    let buttonClassName;
    let buttonName;
    let doing;

    switch (this.props.value) {
      case "delete":
        buttonClassName = "delete"
        buttonName = "削除"
        doing = "削除しますか？"
      break;
      case "pass":
        buttonClassName = "OK"
        buttonName = "OK"
        doing = "お渡し済にしますか？"
      break;
    }

    if (this.state.modal) {
      modal = (
        <div>
          <div className="confirModal">
            <div className="confirModal-inner">
              <div className="confirModal-header">
                <p>確認</p>
                <img src="/assets/modal/close.png"
                   className="close-btn"
                   onClick={() => {this.handleClickClose()}}
                />
              </div>
              <div className="confirModal-contents">
                <p>{this.props.text}を</p>
                <p>{doing}</p>
              </div>
              <div className="confirModal-button">
                <button onClick={() => this.handleClickClose()} className="quit" type="button">
                  戻る
                </button>
                <button className={buttonClassName} id={this.props.Id} type="submit" form={this.props.form}>
                  {buttonName}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className={this.props.className + "-modal"}>
        <div onClick={() => this.handleClickOpen()}>
          {visible}
        </div>
        {modal}
      </div>
    );
  }
}

export default ConfirModal
