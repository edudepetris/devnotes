require 'test_helper'
require 'devise/jwt/test_helpers'

# Rails funtional test for Notes
class Api::V1::NotesControllerTest < ActionDispatch::IntegrationTest
  test 'needs authentication' do
    user = users(:one)
    headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }

    # This will add a valid token for `user` in the `Authorization` header
    auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)

    get api_v1_user_notes_url, headers: auth_headers

    assert_response :success
  end

  test 'no accept unauthorize requests' do
    headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }

    get api_v1_user_notes_url, headers: headers

    assert_response 401
  end
end
