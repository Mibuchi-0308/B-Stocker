import React from "react"
import PropTypes from "prop-types"

import ConfirModal from "./ConfirModal"

class CustomerDelete extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    modal: "close",
  };}

  handleClick() {
    if (this.state.modal === "open_a") {
      this.setState({modal: "open_b"});
    } else {
      this.setState({modal: "open_a"});
    }
  }

  render () {
    let modal;
    {/* keyを渡すことで、ConfirModalの初期化(再生成/再マウント)が可能。*/}
    {/* もしkeyが無ければ、aとbで同一のモーダルを開くことになり、ConfirModalのstateの更新が出来ないままとなる。 */}
    switch (this.state.modal) {
      case "open_a":
        modal = <ConfirModal
        key="open_a"
        name="削除"
        className="bookDelete"
        text={this.props.name}
        Id={this.props.customerId}
        value="delete"
        form={`deleteCustomer_${this.props.customerId}`}
        />
      break;
      case "open_b":
        modal = <ConfirModal
        key="open_b"
        name="削除"
        className="bookDelete"
        text={this.props.name}
        Id={this.props.customerId}
        value="delete"
        form={`deleteCustomer_${this.props.customerId}`}
        />
      break;
    }

    return (
      <div className="deleteButton">
        {modal}
        <button className="delete" onClick={() => this.handleClick()}>削除</button>
      </div>
    );
  }
}

export default CustomerDelete
