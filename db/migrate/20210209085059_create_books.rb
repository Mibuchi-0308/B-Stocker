class CreateBooks < ActiveRecord::Migration[6.0]
  def change
    create_table :books do |t|
      t.string :name
      t.string :c_day
      t.string :i_day
      t.integer :user_id
      t.integer :folder_id

      t.timestamps
    end
  end
end
