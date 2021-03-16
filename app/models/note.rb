# References a notes.md
class Note < ApplicationRecord
  belongs_to :user

  validates :content, :project_name, presence: true
  validates :project_name, uniqueness: { scope: :user }
end
