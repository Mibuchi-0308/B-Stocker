class CustomersController < ApplicationController
before_action :authenticate_user, {only: [:create, :createOrder]}
before_action :ensure_correct_user, {only: [:index]}
before_action :ensure_correct_customer, {only: [:info, :edit, :delete, :updateOrder]}

  def index
    @customers = Customer.where(user_id: params[:user_id])
    @books = Book.where(user_id: params[:user_id])
    @folders = Folder.where(user_id: params[:user_id])
    @orders = Order.where(user_id: params[:user_id]).order(created_at: :desc)
  end


  def create
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
      render("/customers/create")
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
            user_id: @currentUser.id,
            passed: "yet"
          )
          if !@order.save
            flash[:notice] = "客注書籍に問題があります"
            break
            render("/customers/create")
          else
            @order.save
          end
        end
        flash[:notice] = "顧客の登録を完了しました"
        redirect_to("/menu")
      else
        flash[:notice] = "顧客情報の内容に問題があります"
        render("customers/create")
      end
    end

  end


  def info
    @customer = Customer.find_by(id: params[:customer_id])
    @orders = Order.where(customer_id: params[:customer_id])

    @incompleteOrders = @orders.where(passed: "yet")
    @passedOrders = @orders.where(passed: "done")

    @orderBooks = []
    @orders.each do |order|
      orderBook = Book.find_by(id: order.book_id)
      @orderBooks.push(orderBook)
    end

    @i_books = []
    @incompleteOrders.each do |i_order|
      i_book = Book.find_by(id: i_order.book_id)
      @i_books.push(i_book)
    end

    @p_books = []
    @passedOrders.each do |p_order|
      p_book = Book.find_by(id: p_order.book_id)
      @p_books.push(p_book)
    end
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

    @customer = Customer.find_by(id: params[:customer_id])
    @customer.name = params[:customerName]
    @customer.tel = params[:tel]

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
      render("/customers/edit")
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
        redirect_to("/menu")
      else
        flash[:notice] = "顧客情報の内容に問題があります"
        render("customers/#{@customer.id}/edit")
      end
    end
  end


  def delete
    @customer = Customer.find_by(id: params[:customer_id])
    @orders = Order.where(customer_id: @customer.id)

    if @orders.destroy_all
      @customer.destroy
      flash[:notice] = "#{@customer.name}様の顧客情報が削除されました"
      redirect_to("/customers/#{@currentUser.id}/index")
    else
      flash[:notice] = "Error! 顧客情報の削除に失敗しました"
      redirect_to("customers/#{@customer.id}/info")
    end
  end


  def updatePassedStatus
    @customer = Customer.find_by(id: params[:customer_id])

    if params[:unpassedBooks]
      params[:unpassedBooks].each do |unpassedBook|
        book = Book.find_by(name: unpassedBook, user_id: @currentUser.id)
        up_order = Order.find_by(customer_id: @customer.id, book_id: book.id)
        up_order.passed = "yet"
        up_order.save
      end
    end

    if params[:passedBooks]
      params[:passedBooks].each do |passedBook|
        book = Book.find_by(name: passedBook, user_id: @currentUser.id)
        p_order = Order.find_by(customer_id: @customer.id, book_id: book.id)
        p_order.passed = "done"
        p_order.save
      end
    end

    flash[:notice] = "受け渡し情報を変更しました"
    redirect_to("/customers/#{@customer.id}/info")

  end


  #検証用
  def ensure_correct_user
    if @currentUser.id != params[:user_id].to_i
      flash[:notice] = "権限がありません"
      redirect_to("/menu")
    end
  end

  def ensure_correct_customer
    @customer = Customer.find_by(id: params[:customer_id])
    if @currentUser.id != @customer.user_id
      flash[:notice] = "権限がありません"
      redirect_to("/menu")
    end
  end

end
