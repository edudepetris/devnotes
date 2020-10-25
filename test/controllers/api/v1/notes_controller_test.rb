require 'test_helper'

# Rails funtional test for Notes
class Api::V1::NotesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:one)

    # This will add a valid token for `user` in the `Authorization` header
    @auth_headers = create_auth_headers(@user)
  end

  test 'no accept unauthorize requests' do
    post api_v1_user_notes_path, params: {}, headers: api_headers

    assert_response 401
  end

  test 'when not found returns 404' do
    put api_v1_user_note_path(101_010), params: {}, headers: @auth_headers

    assert_response :not_found
  end

  test 'create' do
    body = {
      note: {
        project_name: 'revelion',
        content: 'use the force or sudo'
      }
    }.to_json

    post api_v1_user_notes_path, params: body, headers: @auth_headers

    assert_response :success
    assert_equal 3, @user.notes.count
  end

  test 'update' do
    note = @user.notes.first

    body = {
      note: {
        content: 'fresh content'
      }
    }.to_json

    put api_v1_user_note_path(note), params: body, headers: @auth_headers

    assert_response :success
    assert_equal 'fresh content', note.reload.content
  end
end
