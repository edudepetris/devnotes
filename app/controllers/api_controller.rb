# rubocop:disable Rails/ApplicationController
# Api base class.
class ApiController < ActionController::Base
  before_action :set_default_format

  # In order for devise to know it can respond to json format
  # https://github.com/waiting-for-dev/devise-jwt/wiki/Configuring-devise-for-APIs
  respond_to :json

  responders :my_application

  private

  def set_default_format
    request.format = :json
  end
end
# rubocop:enable Rails/ApplicationController
