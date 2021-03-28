Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  #ホーム
  get "/" => "home#howto"
  get "/menu" => "home#menu"
  get "howto" => "home#howto"

  #フォルダー書籍
  get "folders/:folder_id/books" => "folders#books"
  get "folders/:user_id/index" => "folders#index"

  post "folders/create" =>"folders#create"
  post "folders/:folder_id/updateFolder" => "folders#updateFolder"
  post "folders/:folder_id/deleteFolder" => "folders#deleteFolder"

  post "folders/:folder_id/createBook" => "folders#createBook"
  post "folders/:book_id/updateBook" => "folders#updateBook"
  post "folders/:book_id/deleteBook" => "folders#deleteBook"

  #ユーザー
  get "users/:user_id" => "users#show"
  get "users/:user_id/removePassOfPassword" => "users#passOfPassword_remove"

  post "login" => "users#login"
  post "logout" => "users#logout"
  post "users/create" => "users#create"
  post "users/:user_id/updateUser" => "users#update"
  post "users/:user_id/deleteUser" => "users#delete"
  post "users/:user_id/passOfPassword" =>"users#passOfPassword"

  #顧客＆オーダー
  get "customers/create" => "customers#create"
  get "customers/:user_id/index" => "customers#index"
  get "customers/:customer_id/info" => "customers#info"
  get "customers/:customer_id/edit" => "customers#edit"

  post "/createOrder" => "customers#createOrder"
  post "/customers/:customer_id/deleteCustomer" => "customers#delete"
  post "/customers/:customer_id/updateOrder" => "customers#updateOrder"


end
