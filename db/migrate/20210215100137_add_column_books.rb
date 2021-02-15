class AddColumnBooks < ActiveRecord::Migration[6.0]
  def change
    add_column :books, :c_day, :date
    add_column :books, :i_day, :date
  end
end
