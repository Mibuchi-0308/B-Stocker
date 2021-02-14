class AddAmountToBooks < ActiveRecord::Migration[6.0]
  def change
    add_column :books, :amount, :integer
  end
end
