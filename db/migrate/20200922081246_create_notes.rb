class CreateNotes < ActiveRecord::Migration[6.0]
  def change
    create_table :notes do |t|
      t.text :content
      t.string :project_name
      t.references :user

      t.timestamps
    end
  end
end
