Rails.application.routes.draw do
  get 'customers/new' => "customers#new"

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get "/" => "home#top"
  get "howto" => "home#howto"

  get "folders/:folder_id" => "folders#books"
  get "folders" => "folders#index"
  get "folders/index" => "folders#index"
  post "users/create" => "users#create"
  post "folders/create" =>"folders#create"
  post "folders/createBook" => "folders#createBook"
  post "folders/:folder_id/updateFolder" => "folders#updateFolder"
  post "folders/:folder_id/deleteFolder" => "folders#deleteFolder"
  post "folders/:book_id/updateBook" => "folders#updateBook"
  post "folders/:book_id/deleteBook" => "folders#deleteBook"
end
