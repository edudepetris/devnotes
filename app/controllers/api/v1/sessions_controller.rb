# Sign in/out API users.
class Api::V1::SessionsController < Devise::SessionsController
  respond_to :json
  protect_from_forgery unless: -> { request.format.json? }
end
