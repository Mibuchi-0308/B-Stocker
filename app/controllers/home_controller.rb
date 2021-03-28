class HomeController < ApplicationController
before_action :authenticate_user, {only: [:menu]}
  def menu
  end

  def howto
  end
end
