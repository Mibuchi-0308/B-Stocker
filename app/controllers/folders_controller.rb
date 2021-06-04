class FoldersController < ApplicationController
before_action :authenticate_user, {only: [:index, :books]}
before_action :ensure_correct_folder, {only: [:updateFolder, :deleteFolder]}
before_action :ensure_correct_book, {only: [:updateBook, :deleteBook]}

  def index
    @folders = Folder.where(user_id: @currentUser.id)
  end

  def create
    @folder = Folder.new(name: params[:folderName], user_id: @currentUser.id)
    if @folder.save
      flash[:notice] = "フォルダを作成しました"
      redirect_to("/folders/#{@currentUser.id}/index")
    else
      flash[:notice] = "フォルダの保存に失敗しました。内容を確認してください"
      redirect_to("/folders/#{@currentUser.id}/index")
    end
  end

  def updateFolder
    @folder = Folder.find_by(id: params[:folder_id])
    @folder.name = params[:folder_name]
    if @folder.save
      flash[:notice] = "フォルダを編集しました"
    else
      flash[:notice] = "フォルダの編集に失敗しました。内容を確認してください"
    end
    redirect_to("/folders/#{@folder.id}/books")
  end

  def deleteFolder
    @folder = Folder.find_by(id: params[:folder_id])
    @books = Book.where(folder_id: @folder.id)
    if !@books && @folder.destroy
      flash[:notice] = "フォルダが削除されました"
      redirect_to("/folders/#{@currentUser.id}/index")
    elsif @books.delete_all && @folder.destroy
      flash[:notice] = "フォルダと含まれていた書籍を削除しました"
      redirect_to("folders/#{@currentUser.id}/index")
    else
      flash[:notice] = "フォルダの削除に失敗しました"
      redirect_to("folders/#{@folder.id}/books")
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
                    user_id: @currentUser.id,
                    folder_id: @folder.id
                    )

    if @book.amount.to_i < 0
      flash[:notice] = "書籍の数量は未定、0以上でなければなりません"
    elsif @book.save
      flash[:notice] = "書籍が#{@folder.name}に登録されました"
    else
      flash[:notice] = "書籍が登録されませんでした。内容を確認してください"
    end
    redirect_to("/folders/#{@folder.id}/books")
  end

  def updateBook
    @book = Book.find_by(id: params[:book_id])
    @book.name = params[:book_name]
    @book.c_day = params[:c_day]
    @book.i_day = params[:i_day]
    @book.amount = params[:amount]

    if @book.amount.to_i >= 0
      @book.save
      flash[:notice] = "書籍が編集されました"
    elsif @book.amount.to_i < 0
      flash[:notice] = "書籍の数量は未定、若しくは0以上でなければなりません"
    elsif !@book.save
      flash[:notice] = "書籍の編集に失敗しました。内容を確認してください"
    end
    redirect_to("/folders/#{@book.folder_id}/books")
  end

  def deleteBook
    @book = Book.find_by(id: params[:book_id])
    if @book.destroy
      flash[:notice] = "書籍が削除されました"
    else
      flash[:notice] = "書籍の削除に失敗しました"
    end
    redirect_to("/folders/#{@book.folder_id}/books")
  end

  #権限確認
  def ensure_correct_folder
    @folder = Folder.find_by(id: params[:folder_id])
    if @currentUser.id != @folder.user_id
      flash[:notice] = "権限がありません"
      redirect_to("/")
    end
  end

  def ensure_correct_book
    @book = Book.find_by(id: params[:book_id])
    if @currentUser.id != @book.user_id
      flash[:notice] = "権限がありません"
      redirect_to("/")
    end
  end

end
