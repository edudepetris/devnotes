require 'test_helper'

# Rails funtional test for Notes
class Api::V1::NotesControllerTest < ActionDispatch::IntegrationTest
  test 'needs authentication' do
    user = users(:one)

    # This will add a valid token for `user` in the `Authorization` header
    auth_headers = create_auth_headers(user)

    get api_v1_user_notes_url, headers: auth_headers

    assert_response :success
  end

  test 'no accept unauthorize requests' do
    get api_v1_user_notes_url, headers: api_headers

    assert_response 401
  end
end
