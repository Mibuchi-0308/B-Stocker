class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.integer :amount
      t.integer :customer_id
      t.integer :book_id

      t.timestamps
    end
  end
end
