Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
    root to: "static_pages#home"

    namespace :api do

      #users
      post '/users/create' => 'users#createGuest'

      #sessions
      post '/sessions' => "sessions#create"
      delete '/sessions/delete' => 'sessions#destroy'
      get '/authenticated' => 'sessions#authenticated'

      #message
      post '/message/create' => 'messages#create'
      get '/messages' => 'messages#show'

      #
      get '/group' => 'group#getGroup'
      put '/group/update' => 'group#update'
    end
end
