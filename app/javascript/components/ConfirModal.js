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
                <p>{this.props.text}</p>
              </div>
              <div className="confirModal-button">
                <button onClick={() => this.handleClickClose()} className="quit" type="button">
                  戻る
                </button>
                <button className="delete" id={this.props.Id} type="submit" form={this.props.form}>
                  削除
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
