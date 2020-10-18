require 'application_system_test_case'

class SignOutTest < ApplicationSystemTestCase
  test 'signing out' do
    visit new_user_session_path

    fill_in id: 'user_email', with: 'yoda@mail.com'
    fill_in id: 'user_password', with: 'password'

    click_on 'Sign In'

    assert_text 'Devnotes'

    click_on 'Profile'
    find('a', text: 'Sign out').click

    assert_text 'welcome'
  end
end
