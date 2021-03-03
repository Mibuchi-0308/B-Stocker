import React from "react"
import PropTypes from "prop-types"
class CustomersOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addList: Array(),
      message: "右の希望書籍をクリックしてください。",
      selectedFolder: "フォルダを選択してください",
      searchedBooks: ""
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
    } else {
      newValue.push(clicked);
      //ID基準の並べ替え。任意番号だとか、発売日でソートしたほうがよさそう。
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
      switchMessage = `『${clicked.name}』の数量を客注リストから削減しました。`
      this.setState({addList: list, message: switchMessage});
    }

  }

  handleClickSelectFolder(clicked) {
    let searched;
    let allBooks = this.props.books;
    let targetFolder = this.props.folders;
    searched = allBooks.find((book) => {
      return (book.folder_id === targetFolder.id)
    });
    this.setState({selectedFolder: clicked, searchedBooks: searched});
  }


  render () {
    let thisValue;
    let bookList;
    let folderList;
    let addListObject;
    let addList = this.state.addList;
    let message = this.state.message;
    let folderName = <p>{this.state.selectedFolder}</p>;

    bookList = this.props.books.map((book) => {
      thisValue = book.name;
      return (
        <div className="bookListValue" key={book.id}>
          <textarea
            key={book.id}
            defaultValue={thisValue}
            onClick={() => {this.handleClickAdd(book.id)}}
            readOnly
          />
        </div>
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
            name="orderBook[]"
            id={book.name + "-id:z" + book.id}
            />
          <textarea
          className="orderBookAmount"
            defaultValue={book.amount}
            readOnly
            name="orderAmount[]"
            id={book.name + "-amount"}
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
          {folderName}
          {bookList}
          {folderList}
        </div>
      </div>
    );
  }
}

export default CustomersOrder
