Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'dashboard#index'

  get 'dashboard', to: 'dashboard#index'

  namespace :api do
    namespace :v1 do
      defaults format: :json do
        # Because Devise doesn't support api app out of the box.
        devise_scope :user do
          post   '/users/sign_in', to: 'sessions#create'
          delete '/users/sign_out', to: 'sessions#destroy'
        end

        resource :user, only: [] do
          resources :notes, only: %i[create update]
        end
      end
    end

    namespace :frontend do
      namespace :v1 do
        defaults format: :json do
          resources :notes, only: %i[show]
        end
      end
    end
  end
end
