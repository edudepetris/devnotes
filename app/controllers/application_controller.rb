# Controller base class.
class ApplicationController < ActionController::Base
  # Devise
  def after_sign_in_path_for(resource)
    stored_location_for(resource) || dashboard_path
  end
end
