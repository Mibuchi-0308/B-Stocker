class CustomersController < ApplicationController
  def new
    @hashed_books = []
    @books = Book.all
    @books.each do |book|
      book = book.attributes
      book["amount"] = 1
      @hashed_books.push(book)
    end
  end
end
