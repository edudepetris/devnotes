Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      # Because Devise doesn't support api app out of the box.
      devise_scope :user do
        post   '/users/sign_in', to: 'sessions#create'
        delete '/users/sign_out', to: 'sessions#destroy'
      end

      get '/user/notes', to: 'notes#index'
    end
  end
end
