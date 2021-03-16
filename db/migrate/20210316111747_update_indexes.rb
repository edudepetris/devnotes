class UpdateIndexes < ActiveRecord::Migration[6.1]
  def change
    remove_index :notes, :project_name, unique: true
    change_column_null :notes, :project_name, false
    add_index :notes, [:project_name, :user_id], unique: true
  end
end
