Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  #ホーム
  get "/" => "home#howto"
  get "/top" => "home#top"
  get "howto" => "home#howto"

  #フォルダー＆書籍
  get "folders/:folder_id/books" => "folders#books"
  get "folders/:user_id/index" => "folders#index"

  post "folders/create" =>"folders#create"
  post "folders/:folder_id/updateFolder" => "folders#updateFolder"
  post "folders/:folder_id/deleteFolder" => "folders#deleteFolder"

  post "folders/:folder_id/createBook" => "folders#createBook"
  post "folders/:book_id/updateBook" => "folders#updateBook"
  post "folders/:book_id/deleteBook" => "folders#deleteBook"

  #ユーザー
  get "users/:user_id" => "users#user"

  post "login" => "users#login"
  post "logout" => "users#logout"
  post "users/create" => "users#create"
  post "users/checkPassword" =>"users#checkPassword"

  #顧客＆オーダー
  get 'customers/new' => "customers#new"
  get "customers/:user_id/index" => "customers#index"
  get "customers/:customer_id/info" => "customers#info"
  get "customers/:customer_id/edit" => "customers#edit"

  post "/customers/:customer_id/deleteCustomer" => "customers#delete"
  post "/createOrder" => "customers#createOrder"
  post "/updateOrder" => "customers#updateOrder"

end
