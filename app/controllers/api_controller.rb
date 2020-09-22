# rubocop:disable Rails/ApplicationController
# Api base class.
class ApiController < ActionController::Base
  before_action :set_default_format

  private

  def set_default_format
    request.format = :json
  end
end
# rubocop:enable Rails/ApplicationController