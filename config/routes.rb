Rails.application.routes.draw do
  get 'customers/new' => "customers#new"

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get "/" => "home#howto"
  get "/top" => "home#top"
  get "howto" => "home#howto"

  get "folders/:folder_id/books" => "folders#books"
  get "folders/:user_id/index" => "folders#index"
  post "folders/create" =>"folders#create"
  post "folders/:folder_id/updateFolder" => "folders#updateFolder"
  post "folders/:folder_id/deleteFolder" => "folders#deleteFolder"

  post "folders/:folder_id/createBook" => "folders#createBook"
  post "folders/:book_id/updateBook" => "folders#updateBook"
  post "folders/:book_id/deleteBook" => "folders#deleteBook"

  get "users/:user_id" => "users#user"
  post "login" => "users#login"
  post "logout" => "users#logout"
  post "users/create" => "users#create"




end
