require 'application_system_test_case'

class DashboardTest < ApplicationSystemTestCase
  test 'jumping between notes' do
    visit dashboard_path

    fill_in id: 'user_email', with: 'yoda@mail.com'
    fill_in id: 'user_password', with: 'password'

    click_on 'Sign In'

    assert_text 'Devnotes'

    find('h2', text: 'Death Start').click

    assert_text 'This text is for testing'

    find('h2', text: 'Starkiller Base').click

    assert_text 'This is the text for testing'
  end

  test 'reading the meta data' do
    visit dashboard_path

    fill_in id: 'user_email', with: 'yoda@mail.com'
    fill_in id: 'user_password', with: 'password'

    click_on 'Sign In'

    assert_text 'Devnotes'

    find('h2', text: 'Death Start').click

    assert_text 'This text is for testing'

    click_on 'Meta'

    assert_text notes(:one).created_at.to_date.to_s
  end

  test 'reading the raw content' do
    visit dashboard_path

    fill_in id: 'user_email', with: 'yoda@mail.com'
    fill_in id: 'user_password', with: 'password'

    click_on 'Sign In'

    assert_text 'Devnotes'

    find('h2', text: 'Death Start').click

    assert_text 'This text is for testing'

    click_on 'Raw'

    assert_text '### Devnotes'
  end

  test 'welcome message' do
    Note.destroy_all

    visit dashboard_path

    fill_in id: 'user_email', with: 'yoda@mail.com'
    fill_in id: 'user_password', with: 'password'

    click_on 'Sign In'

    assert_text 'Devnotes'

    assert_text 'Follow the link to download the CLI'
  end
end
