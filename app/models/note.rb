# References a notes.md
class Note < ApplicationRecord
  belongs_to :user

  validates :content, :project_name, presence: true
end
