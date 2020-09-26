require 'devise/jwt/test_helpers'

module ApiSignInHelper
  def api_headers
    { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }
  end

  # This will add a valid token for `user` in the `Authorization` header
  def create_auth_headers(user)
    Devise::JWT::TestHelpers.auth_headers(api_headers, user)
  end
end
