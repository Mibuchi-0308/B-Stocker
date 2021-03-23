class ApplicationController < ActionController::Base
  before_action :set_current_user
  before_action :set_passwordChecked

  def set_current_user
    @currentUser = User.find_by(id: session[:user_id])
  end

  def set_passwordChecked
    #セッションにパスワードをそのまま保存はおそらく良くない。暗号化だとか、何かしらのリストに紐づけるなどをすべき。
    @checkedPassword = session[:userPassword]
  end

  def authenticate_user
    if @currentUser == nil
      flash[:notice] = "ログインをしてください"
      redirect_to("/")
    end
  end

  def forbid_login_user
    if @currentUser
      flash[:notice] = "既にログインしています"
      redirect_to("/users/#{@cuurentUser.id}")
    end
  end

  def ensure_correct_user
    if @currentUser != params[:user_id].to_i
      flash[:notice] = "権限がありません"
      redirect_to("/menu")
    end
  end

  def ensure_passwordPass
    if !@checkedPassword
      flash[:notice] = "編集権限を付与してください。マイページ→パスワード認証"
      redirect_to("/users/#{@currentUser.id}")
    end
  end

end
