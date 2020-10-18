require 'application_system_test_case'

class ResetPasswordTest < ApplicationSystemTestCase
  include ActionMailer::TestHelper

  test 'reseting my password' do
    visit new_user_password_path

    fill_in id: 'user_email', with: 'yoda@mail.com'

    assert_emails 1 do
      click_on 'Send me reset password instructions'
    end

    reset_password_token = get_reset_password_token

    assert_text 'You will receive an email with instructions on how to reset your password in a few minutes.'

    visit edit_user_password_path(reset_password_token: reset_password_token)

    fill_in id: 'user_password', with: 'secr3t!'
    fill_in id: 'user_password_confirmation', with: 'secr3t!'
    click_on 'Change my password'

    user = users(:one)

    assert_nil user.reload.reset_password_token
    assert_text 'welcome'
  end

  def get_reset_password_token
    # get the email
    message = ActionMailer::Base.deliveries[0].to_s
    rpt_index = message.index('reset_password_token') + 'reset_password_token'.length + 1
    message[rpt_index...message.index('"', rpt_index)]
  end
end
