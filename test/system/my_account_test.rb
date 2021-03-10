require 'application_system_test_case'

class MyAccountTest < ApplicationSystemTestCase
  test 'changing my password' do
    visit dashboard_path

    fill_in id: 'user_email', with: 'yoda@mail.com'
    fill_in id: 'user_password', with: 'password'

    click_on 'Sign In'

    assert_text 'Devnotes'

    click_on 'Profile'

    find('a', text: 'My Account').click

    assert_text 'Edit my account'

    fill_in id: 'user_password', with: 'newpassword'
    fill_in id: 'user_password_confirmation', with: 'newpassword'
    fill_in id: 'user_current_password', with: 'password'

    click_on 'Update'

    assert_text 'Dashboard'

    click_on 'Profile'
    find('a', text: 'Sign out').click
    assert_text 'Login'

    visit new_user_session_path
    fill_in id: 'user_email', with: 'yoda@mail.com'
    fill_in id: 'user_password', with: 'newpassword'
    click_on 'Sign In'
    assert_text 'Devnotes'
  end
end
