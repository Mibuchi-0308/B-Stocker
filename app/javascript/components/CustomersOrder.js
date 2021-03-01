import React from "react"
import PropTypes from "prop-types"
class CustomersOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addList: Array(),
      message: "右の希望書籍をクリックしてください。",
    };
  }

  handleClickAdd(value) {
    const newValue = this.state.addList.slice();
    let clicked = this.props.books.find((book) => {
      return (book.id === value)
    });

    let pure = this.state.addList;
    let pureFind = pure.find((book) => {
      return (book.id === value );
    });

    let switchMessage = pureFind ? `『${clicked.name}』の冊数を追加しました。` : `『${clicked.name}』を追加しました。`;
    this.setState({message: switchMessage});

    //amountの処理
    if (pureFind) {
      //クリックされたaddListの要素を取り出し
      let clicked = this.state.addList.find((book) => {
        return (book.id === value)
      });
      //取り出した要素のamountを変数化、1足す
      let clickedAmount = clicked.amount;
      clickedAmount ++;
      //変更したamountを戻したい
      //this.state.addListを変数list化
      let list = this.state.addList;
      //listから取り出した変更したい要素を狙う
      let target = list.find((book) => {
        return (book.id === value)
      })
      target.amount = clickedAmount;
      this.setState({addList: list});
    }

    if (!pureFind) {
      newValue.push(clicked);
      newValue.sort((a,b) =>{
        if (a.id < b.id) {
          return -1;
        } else {
          return 1;
        }
      })
      this.setState({addList: newValue});
    }
  }

  handleClickRemove(value) {
    let switchMessage;
    let list = this.state.addList;
    let clicked = list.find((book) => {
      return (book.id === value)
    });

    if (clicked.amount === 1) {
      let unClicked = list.filter((book) => {
        return (book.id !== value)
      });
      switchMessage = `『${clicked.name}』を客注リストから削除しました。`;
      this.setState({addList: unClicked, message: switchMessage});
    } else {
      clicked.amount --;
      switchMessage = `『${clicked.name}』の数量を客注リストから減らしました。`
      this.setState({addList: list});
    }

  }


  render () {
    let thisValue;
    let bookList;
    let addListObject;
    let addList = this.state.addList;
    let message = this.state.message;

    bookList = this.props.books.map((book) => {
      thisValue = book.name;
      return (
        <textarea
          key={book.id}
          defaultValue={thisValue}
          onClick={() => {this.handleClickAdd(book.id)}}
          readOnly
        />
      );
    });


    addListObject = addList.map((book)=> {
      thisValue = book.name;
      return (
        <div className="addListValue" key={book.id}>
          <textarea
            defaultValue={thisValue}
            onClick={() => {this.handleClickRemove(book.id)}}
            readOnly
            />
          <textarea
            defaultValue={book.amount}
            readOnly
          />
        </div>
      );
      })

    return (
      <div className="orderList">
        <div className="addList">
          <p>{message}</p>
          {addListObject}
        </div>
        <div className="bookList">
          {bookList}
        </div>
      </div>
    );
  }
}

export default CustomersOrder
