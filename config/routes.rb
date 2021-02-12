Rails.application.routes.draw do
  get 'customers/new'
  get 'folders/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get "/" => "home#top"
  get "/howto" => "home#howto"
  get "/folders" => "folders#index"
  post "/folders/create" =>"folders#create"
end
