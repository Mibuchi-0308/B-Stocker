class UsersController < ApplicationController
  def create
    @user = User.new(
      name: params[:user_name],
      email: params[:email],
      password: params[:password])
    if @user.save
      flash[:notice] = "アカウントを作成しました。"
      redirect_to("/")
    else
      flash[:notice] = "アカウントの作成に失敗しました。登録内容を確認してください。"
      #できればトップに戻りつつ、ユーザー作成モーダルを開いてレンダーしたい。
      redirect_to("/")
    end
  end
end
