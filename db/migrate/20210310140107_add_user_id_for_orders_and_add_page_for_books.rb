class AddUserIdForOrdersAndAddPageForBooks < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :user_id, :integer
    add_column :books, :page, :integer
  end
end
