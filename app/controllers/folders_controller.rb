class FoldersController < ApplicationController
  def index
    @folders = Folder.where(user_id: 1)
  end

  def create
    @folder = Folder.new(name: params[:folderName], user_id: 1)
    if @folder.save
      flash[:notice] = "フォルダを作成しました"
      redirect_to("/folders")
    else
      flash[:notice] = "名前の入力をしてください"
      redirect_to("/folders")
    end
  end

  def updateFolder
    @folder = Folder.find_by(id: params[:folder_id])
    @folder.name = params[:folder_name]
    if @folder.save
      flash[:notice] = "フォルダを編集しました"
    else
      flash[:notice] = "フォルダの編集に失敗しました"
    end
    redirect_to("/folders/#{@folder.id}")
  end

  def deleteFolder
    @folder = Folder.find_by(id: params[:folder_id])
    @book = Book.find_by(folder_id: @folder.id)
    if !@book && @folder.destroy
      flash[:notice] = "フォルダが削除されました"
      redirect_to("/folders")
    else
      flash[:notice] = "書籍の削除に失敗しました"
      redirect_to("/folders/#{@folder.id}")
    end

  end

  def books
    @folder = Folder.find_by(id: params[:folder_id])
    @books = Book.where(folder_id: @folder.id).order(created_at: :asc)
  end

  def createBook
    @folder = Folder.find_by(id: params[:folder_id])
    @book = Book.new(name: params[:book_name],
                    c_day: params[:c_day],
                    i_day: params[:i_day],
                    amount: params[:amount],
                    user_id: 1,
                    folder_id: @folder.id
                    )

    if @book.amount.to_i < 0
      flash[:notice] = "書籍の数量は未定、0以上でなければなりません"
    elsif @book.save
      flash[:notice] = "書籍が#{@folder.name}に登録されました"
    else
      flash[:notice] = "書籍が登録されませんでした。内容を確認してください"
    end
    redirect_to("/folders/#{@folder.id}")
  end

  def updateBook
    @book = Book.find_by(id: params[:book_id])
    @book.name = params[:book_name]
    @book.c_day = params[:c_day]
    @book.i_day = params[:i_day]
    @book.amount = params[:amount]

    if !@book.amount || @book.amount >= 0
      @book.save
      flash[:notice] = "書籍が編集されました"
    elsif @book.amount < 0
      flash[:notice] = "書籍の数量は未定、若しくは0以上でなければなりません"
    elsif !@book.save
      flash[:notice] = "書籍が編集されませんでした。内容を確認してください"
    end
    redirect_to("/folders/#{@book.folder_id}")
  end

  def deleteBook
    @book = Book.find_by(id: params[:book_id])
    if @book.destroy
      flash[:notice] = "書籍が削除されました"
    else
      flash[:notice] = "書籍の削除に失敗しました"
    end
    redirect_to("/folders/#{@book.folder_id}")
  end

end
