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

  def createOrder
    #render用
    @hashed_books = []
    @books = Book.where(user_id: @currentUser.id)
    @folders = Folder.where(user_id: @currentUser.id)
    @books.each do |book|
      book = book.attributes
      book["amount"] = 1
      @hashed_books.push(book)
    end
    #ここまで

    @customer = Customer.new(
      name: params[:customerName],
      tel: params[:tel],
      user_id: @currentUser.id
    )

    flag = "default"
    orders = []
    i = 0;

    if params[:bookName] && params[:bookAmount]
      params[:bookName].each do |bookName|
        order = {name: bookName}
        orders.push(order)
      end
      params[:bookAmount].each do |bookAmount|
        orders[i][:amount] = bookAmount.to_i
        i += 1
      end
      flag = "ok"
    else
      flash[:notice] = "書籍の登録が空です"
      render("/customers/new")
    end

    if flag === "ok"
      if @customer.save
        orders.each do |order|
          orderBook = Book.find_by(name: order[:name], user_id: @currentUser.id)
          @order = Order.new(
            amount: order[:amount].to_i,
            #(顧客IDがまだ生成されてないのが問題。)←saveされた時に生成される。解決。
            customer_id: @customer.id,
            book_id: orderBook.id,
            user_id: @currentUser.id
          )
          if !@order.save
            flash[:notice] = "客注書籍に問題があります"
            break
            render("/customers/new")
          else
            @order.save
          end
        end
        flash[:notice] = "顧客の登録を完了しました"
        redirect_to("/top")
      else
        flash[:notice] = "顧客情報の内容に問題があります"
        render("customers/new")
      end
    end

  end

  def index
    @customers = Customer.where(user_id: @currentUser.id)
    @books = Book.where(user_id: @currentUser.id)
    @folders = Folder.where(user_id: @currentUser.id)
    @orders = Order.where(user_id: @currentUser.id).order(created_at: :desc)
  end

  def info
    @customer = Customer.find_by(id: params[:customer_id])
    @orders = Order.where(customer_id: params[:customer_id])
    @books = Book.where(user_id: @currentUser.id)
  end

  def edit
    #基本的にnewアクションと同じ。
    @hashed_books = []
    @orderBooks = []

    @customer = Customer.find_by(id: params[:customer_id])
    @orders = Order.where(customer_id: @customer.id)
    @books = Book.where(user_id: @currentUser.id)
    @folders = Folder.where(user_id: @currentUser.id)

    @books.each do |book|
      book = book.attributes
      book["amount"] = 1
      @hashed_books.push(book)
    end

    @orders.each do |order|
      orderBook = @books.find_by(id: order.book_id)
      orderBook = orderBook.attributes
      orderBook["amount"] = order.amount
      @orderBooks.push(orderBook)
    end

  end

  def updateOrder
    #render用
    @hashed_books = []
    @books = Book.where(user_id: @currentUser.id)
    @folders = Folder.where(user_id: @currentUser.id)
    @books.each do |book|
      book = book.attributes
      book["amount"] = 1
      @hashed_books.push(book)
    end
    #ここまで

    @customer = Customer.new(
      name: params[:customerName],
      tel: params[:tel],
      user_id: @currentUser.id
    )

    flag = "default"
    orders = []
    i = 0;

    if params[:bookName] && params[:bookAmount]
      params[:bookName].each do |bookName|
        order = {name: bookName}
        orders.push(order)
      end
      params[:bookAmount].each do |bookAmount|
        orders[i][:amount] = bookAmount.to_i
        i += 1
      end
      flag = "ok"
    else
      flash[:notice] = "書籍の登録が空です"
      render("/customers/new")
    end

    if flag === "ok"
      if @customer.save
        orders.each do |order|
          orderBook = Book.find_by(name: order[:name], user_id: @currentUser.id)
          @order = Order.new(
            amount: order[:amount].to_i,
            #(顧客IDがまだ生成されてないのが問題。)←saveされた時に生成される。解決。
            customer_id: @customer.id,
            book_id: orderBook.id,
            user_id: @currentUser.id
          )
          if !@order.save
            flash[:notice] = "客注書籍に問題があります"
            break
            render("/customers/#{@customer.id}/edit")
          else
            @order.save
          end
        end
        flash[:notice] = "顧客の登録を完了しました"
        redirect_to("/top")
      else
        flash[:notice] = "顧客情報の内容に問題があります"
        render("customers/#{@customer.id}/edit")
      end
    end
  end
end
