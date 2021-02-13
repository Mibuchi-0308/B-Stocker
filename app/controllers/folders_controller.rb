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
  end
end
