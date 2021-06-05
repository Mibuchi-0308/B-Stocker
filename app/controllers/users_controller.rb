class UsersController < ApplicationController
before_action :authenticate_user, {only: [:show]}
before_action :forbid_login_user, {only: [:login]}
before_action :ensure_correct_user, {only: [:update, :delete]}

  def show
  end

  def create
    if params[:password_1] == params[:password_2]
      @user = User.new(
        name: params[:user_name],
        email: params[:email],
        password: params[:password_1])
    end
    if @user && @user.save
        flash[:notice] = "アカウントを作成しました"
        redirect_to("/menu")
    else
        flash[:notice] = "アカウントの作成に失敗しました。登録内容を確認してください"
        #できればトップに戻りつつ、ユーザー作成モーダルを開いてレンダーしたい。
        redirect_to("/")
     end
  end

  def login
    @user = User.find_by(
      name: params[:user_name],
      email: params[:email],
      password: params[:password])

    if @user
      session[:user_id] = @user.id
      flash[:notice] = "ログインしました"
      redirect_to("/menu")
    else
      flash[:notice] = "ログインに失敗しました。入力内容を確認してください"
      #できればトップに戻りつつ、ログインモーダルを開いてレンダーしたい。
      redirect_to("/")
    end
  end

  def logout
    session[:user_id] = nil
    flash[:notice] ="ログアウトしました"
    redirect_to("/")
  end

  def update
    #項目にかかわらず編集自体にパスワード再入力が必要になっている問題
    @user = User.find_by(id: params[:user_id])
    @user.name = params[:userName]
    @user.email = params[:email]
    if params[:newPassword1] == params[:newPassword2]
      @user.password = params[:newPassword1]
      if @user.save
        flash[:notice] = "ユーザー情報を編集しました"
        redirect_to("/users/#{@user.id}")
      else
        flash[:notice] = "ユーザー情報の編集の保存に失敗しました"
        redirect_to("/users/#{@user.id}")
      end
    else
      flash[:notice] = "ユーザー情報の編集に失敗しました。内容を確認してください"
      redirect_to("/users/#{@user.id}")
    end
  end

  def delete
    @user = User.find_by(id: params[:user_id])
    @folders = Folder.where(user_id: @user.id)
    @books = Book.where(user_id: @user.id)
    @customers = Customer.where(user_id: @user.id)
    @orders = Order.where(user_id: @user.id)
    if @user
      @folders.destroy_all
      @books.destroy_all
      @customers.destroy_all
      @orders.destroy_all
      @user.destroy
      flash[:notice] = "#{@user.name}様の情報を全て削除しました"
      redirect_to("/")
    else
      flash[:notice] = "ユーザーを定義できませんでした。なんらかの問題があります"
    end
  end

  def passOfPassword
    @user = User.find_by(id: params[:user_id])
    if @user.password == params[:userPassword]
      flash[:notice] = "編集権限を与えました"
      session[:userPassword] = @currentUser.password
      redirect_to("/users/#{@currentUser.id}")
    else
      flash[:notice] = "パスワードが正しくありません"
      redirect_to("/users/#{@currentUser.id}")
    end
  end

  def passOfPassword_remove
    session[:userPassword] = nil
    @checkedPassword = session[:userPassword]
    if @checkedPassword == nil
      flash[:notice] = "編集権限を停止しました"
      redirect_to("/users/#{@currentUser.id}")
    end
  end

  #権限確認
  def forbid_login_user
    if @currentUser
      flash[:notice] = "既にログインしています"
      redirect_to("/users/#{@cuurentUser.id}")
    end
  end

  def ensure_correct_user
    if @currentUser.id != params[:user_id].to_i
      flash[:notice] = "権限がありません"
      redirect_to("/menu")
    end
  end

end
