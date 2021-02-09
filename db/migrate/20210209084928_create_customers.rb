class CreateCustomers < ActiveRecord::Migration[6.0]
  def change
    create_table :customers do |t|
      t.string :name
      t.string :tel
      t.integer :user_id

      t.timestamps
    end
  end
end
