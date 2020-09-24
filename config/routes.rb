Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      devise_for :users, only: :sessions
      get '/user/notes', to: 'notes#index'
    end
  end
end
