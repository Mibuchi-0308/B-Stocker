Rails.application.routes.draw do
  get 'customers/new' => "customers#new"

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get "/" => "home#top"
  get "howto" => "home#howto"

  get "folders/:folder_id" => "folders#books"
  get "folders" => "folders#index"
  get "folders/index" => "folders#index"
  post "folders/create" =>"folders#create"
  post "folders/createBook" => "folders#createBook"
end
