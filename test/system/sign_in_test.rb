require 'application_system_test_case'

class SignInTest < ApplicationSystemTestCase
  test 'signing in' do
    visit new_user_session_path

    fill_in id: 'user_email', with: 'yoda@mail.com'
    fill_in id: 'user_password', with: 'password'

    click_on 'Sign In'

    assert_text 'Devnotes'
  end

  test 'signing in with wrong credentials' do
    visit new_user_session_path

    fill_in id: 'user_email', with: 'sidious@mail.com'
    fill_in id: 'user_password', with: 'Sith'

    click_on 'Sign In'

    assert_text 'Invalid Email or password'
  end
end
