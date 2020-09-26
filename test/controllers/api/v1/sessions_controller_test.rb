require 'test_helper'
# require 'devise/jwt/test_helpers'

# Rails funtional test for Sessions
class Api::V1::SessionsControllerTest < ActionDispatch::IntegrationTest
  test 'success sign in' do
    user = users(:one)
    params = {
      user: {
        email: user.email,
        password: 'password'
      }
    }
    post api_v1_users_sign_in_path, params: params.to_json, headers: api_headers

    assert_response :success
  end

  test 'success sign out' do
    delete api_v1_users_sign_out_path, headers: api_headers

    assert_response :success
  end

  test 'revokes JWT in sign_out' do
    user = users(:one)
    params = {
      user: {
        email: user.email,
        password: 'password'
      }
    }

    # sign in
    post api_v1_users_sign_in_path(format: :json), params: params
    auth = response.headers['Authorization']

    # sign out
    delete api_v1_users_sign_out_path(format: :json), headers: auth_headers(auth)

    get api_v1_user_notes_path, headers: auth_headers(auth)

    assert_response 401
  end

  def auth_headers(auth)
    {
      'Authorization' => auth,
      'Accept' => 'application/json'
    }
  end
end
