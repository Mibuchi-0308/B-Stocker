import React from "react"
import PropTypes from "prop-types"

import ConfirModal from "./ConfirModal"

class PassedFlag extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    isModalOpen: false
  };
  }

handleClickOpenModal() {
  this.setState({isMOdalOpen: true});
}

  render () {
    if this.state.isModalOpen {
      confirModal = <ConfirModal
      name="お渡し済"
      className="bookPassed"
      text={this.props.name + "にしますか？"}
      Id={this.props.orderId}
      value={this.props.value}
      form={`passsedBook_${this.props.orderId}`}
      />
    }

    return (
      <div>
        {confirModal}
        <p onClick={() => this.handleClickOpenModal()}>お渡し済にする</p>
      </div>
    );
  }
}

export default PassedFlag
