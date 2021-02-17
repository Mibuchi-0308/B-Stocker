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

  def books
    @folder = Folder.find_by(id: params[:folder_id])
    @books = Book.where(folder_id: @folder.id)
  end

  def createBook
    @folder = Folder.find_by(name: params[:folder_name])
    @book = Book.new(name: params[:book_name],
                    c_day: params[:c_day],
                    i_day: params[:i_day],
                    amount: params[:amount],
                    user_id: 1,
                    folder_id: @folder.id
                    )
    if @book.save
      flash[:notice] = "書籍が#{@folder.name}に登録されました。"
    else
      flash[:notice] = "書籍が登録されませんでした。内容を確認してください。"
    end
    redirect_to("/folders/#{@folder.id}")
  end

  def dereteBook
    @book = Book.find_by(id: params[:book_id])
    flash[:notice] = "書籍が削除されました"
    @book.destroy
    redirect_to("/folders/#{@book.folder_id}")
  end
end
