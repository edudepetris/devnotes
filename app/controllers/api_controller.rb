# rubocop:disable Rails/ApplicationController
# Api base class.
class ApiController < ActionController::Base
  before_action :set_default_format

  # Rails documentation.
  protect_from_forgery unless: -> { request.format.json? }
  # In order for devise to know it can respond to json format
  # https://github.com/waiting-for-dev/devise-jwt/wiki/Configuring-devise-for-APIs
  respond_to :json

  # devise-jwt
  responders :my_application

  rescue_from ActiveRecord::RecordNotFound do |e|
    render json: { message: e.message }, status: :not_found
  end

  rescue_from ActiveRecord::RecordInvalid do |e|
    render json: { message: e.message }, status: :unprocessable_entity
  end

  private

  def set_default_format
    request.format = :json
  end
end
# rubocop:enable Rails/ApplicationController
