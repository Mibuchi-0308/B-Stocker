class ApplicationController < ActionController::Base
  before_action :set_current_user
  before_action :set_passwordChecked

  def set_current_user
    @currentUser = User.find_by(id: session[:user_id])
  end

  def set_passwordChecked
    @checkedPassword = session[:userPassword]
  end
end
