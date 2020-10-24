require 'test_helper'

class Api::Frontend::V1::NotesControllerTest < ActionDispatch::IntegrationTest
  test 'no accept unauthorize requests' do
    note = notes(:one)

    get api_frontend_v1_note_path(id: note.id)

    assert_response 401
  end

  test 'render a user note when user is logged in' do
    sign_in users(:one)
    note = notes(:one)

    get api_frontend_v1_note_path(id: note.id)

    assert_equal(note.as_json, response.parsed_body)
  end
end
