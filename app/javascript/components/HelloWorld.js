import React from "react"
import PropTypes from "prop-types"
class HelloWorld extends React.Component {
  render () {
    return (
      <div>
        <h1>Hello B-Stocker!</h1>
        <h2>{this.props.name}さんがこちらに向かってきている…！おわりのはじまりさ</h2>
      </div>
    );
  }
}

export default HelloWorld
