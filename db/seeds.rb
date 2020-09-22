# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
if Rails.env.development?
  def fake_content_for(project_name)
    <<~NOTES
      # #{project_name}

      ### Example code.

      ```rb
        #{User.new.method(:update).source}
      ```
    NOTES
  end

  user = User.create!(email: 'yoda@devnotes.com', password: 'password')

  %w[rails github devnotes].each do |project|
    user.notes.create!(project_name: project, content: fake_content_for(project))
  end
end
