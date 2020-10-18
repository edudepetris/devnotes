require 'application_system_test_case'

class SignUpTest < ApplicationSystemTestCase
  test 'signing up' do
    visit new_user_registration_path

    fill_in id: 'user_email', with: 'darth@mail.com'
    fill_in id: 'user_password', with: 'password'
    fill_in id: 'user_password_confirmation', with: 'password'

    click_on 'Sign Up'

    assert_text 'Devnotes'
  end

  test 'signing in with wrong credentials' do
    visit new_user_registration_path

    fill_in id: 'user_email', with: 'yoda@mail.com'
    fill_in id: 'user_password', with: 'password'
    fill_in id: 'user_password_confirmation', with: 'password2'

    click_on 'Sign Up'

    assert_text 'Email has already been taken'
    assert_text "Password confirmation doesn't match Password"
  end
end
