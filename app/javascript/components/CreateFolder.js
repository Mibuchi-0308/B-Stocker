import React from "react"
import PropTypes from "prop-types"
class CreateFolder extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    isModalOpen: false,
  };
  }

  handleClickOpen() {
    this.setState({isModalOpen: true});
  }

  handleClickClose() {
    this.setState({isModalOpen: false});
  }

  render() {
    let createFolder_modal;
    if (this.state.isModalOpen) {
      createFolder_modal = (
        <div className="createFolder-modal">
          <div className="createFolder-modal-inner">
            <div className="createFolder-modal-header">
              <p>フォルダ作成</p>
              <img src="/assets/modal/close.png"
                   className="close-btn"
                   onClick={() => {this.handleClickClose()}}
              />
            </div>
            <div className="createFolder-modal-contents">
              <p>フォルダ名</p>
              <input type="text" name="folderName" />
            </div>
            <div className="createFolder-modal-button">
              <button className="create" type="submit">作成</button>
            </div>
          </div>
        </div>
      );}

      return (
        <div>
          <div className="folder_subMenu">
            <p onClick={() => {this.handleClickOpen()}}>{this.props.name}</p>
            <p>並び替え</p>
          </div>
          {createFolder_modal}
        </div>
      );
  }
}

export default CreateFolder
