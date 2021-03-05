class CustomersController < ApplicationController
  def new
    @hashed_books = []
    @books = Book.where(user_id: @currentUser.id)
    @folders = Folder.where(user_id: @currentUser.id)
    @books.each do |book|
      book = book.attributes
      book["amount"] = 1
      @hashed_books.push(book)
    end
  end
end
