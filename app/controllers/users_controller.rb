class UsersController < ApplicationController

  def create
    if params[:password_1] == params[:password_2]
      @user = User.new(
        name: params[:user_name],
        email: params[:email],
        password: params[:password_1])
    end
    if @user && @user.save
        flash[:notice] = "アカウントを作成しました"
        redirect_to("/")
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
      redirect_to("/")
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

end
