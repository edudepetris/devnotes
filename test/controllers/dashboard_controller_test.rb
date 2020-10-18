require 'test_helper'

class DashboardControllerTest < ActionDispatch::IntegrationTest
  test 'redirect when guest user' do
    get dashboard_path
    assert_response 302
  end

  test 'render dashboard when logged in user' do
    sign_in users(:one)
    get dashboard_path
    assert_response :success
  end
end
