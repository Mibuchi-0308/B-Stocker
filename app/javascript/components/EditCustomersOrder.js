import React from "react"
import PropTypes from "prop-types"
class EditCustomersOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addList: this.props.orderBooks,
      message: "右の希望書籍をクリックしてください。",
      selectedFolder: "",
      searchedBooks: this.props.books
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
      //フォルダID管理で、本はID基準の並べ替え。任意番号だとか、発売日でソートしたほうがよさそう。
      newValue.sort((a,b) =>{
        if (a.folder_id < b.folder_id) return -1;
        if (a.folder_id > b.folder_id) return 1;

        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;

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
      switchMessage = `『${clicked.name}』の数量を1減らしました。`
      this.setState({addList: list, message: switchMessage});
    }

  }

  handleClickSelectFolder(clicked) {
    let searchedBooks;
    let clickedFolder;
    let books = this.props.books;
    let folders = this.props.folders;

    clickedFolder = folders.find((folder) => {
      return (folder.id === clicked)
    });
    searchedBooks = books.filter((book) => {
      return (book.folder_id === clicked)
    });

    this.setState({selectedFolder: clickedFolder.name, searchedBooks: searchedBooks});
  }


  render () {
    let bookValue;
    let bookList;

    let folderValue;
    let folderList;

    let addListObject;
    let addList = this.state.addList;

    let message = this.state.message;
    let folderName = <p>{`フォルダ名:${this.state.selectedFolder}`}</p>;

    bookList = this.state.searchedBooks.map((book) => {
      bookValue = book.name;
      return (
        <tr className="bookListValue" key={book.id} onClick={() => {this.handleClickAdd(book.id)}}>
          <td>{book.name}</td>
        </tr>
      );
    });

    folderList = this.props.folders.map((folder) => {
      folderValue = folder.name;
      return (
        <tr className="folderListValue" key={folder.id} onClick={() => {this.handleClickSelectFolder(folder.id)}}>
          <td>{folderValue}</td>
        </tr>
      );
    });


    addListObject = addList.map((book)=> {
      bookValue = book.name;
      return (
        <div className="addListValue" key={book.id}>
          <input
            className="orderBookName"
            defaultValue={bookValue}
            onClick={() => {this.handleClickRemove(book.id)}}
            readOnly
            name="bookName[]"
            id={book.name + "-id:" + book.id}
            />
          <input
            className="orderBookAmount"
            value={book.amount}
            readOnly
            name="bookAmount[]"
            id={book.name + "-amount"}
          />
        </div>
      );
      })

    return (
      <div className="orderList">
        <div className="addList">
          <h2>注文書籍</h2>
          <p>{message}</p>
          {addListObject}
        </div>
        <div className="orderBookMenu">
          <div className="orderBookMenuHeader">
            <h2>書籍選択</h2>
            {folderName}
          </div>
          <table className="folderList">
            <thead>
              <tr className="folderName">
                <th>フォルダ名</th>
              </tr>
            </thead>
            <tbody>
              {folderList}
            </tbody>
          </table>
          <table className="bookList">
            <thead>
              <tr className="bookName">
                <th>書籍名</th>
              </tr>
            </thead>
            <tbody>
              {bookList}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default EditCustomersOrder
