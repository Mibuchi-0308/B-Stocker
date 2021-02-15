class ChangeToDateBooksColumn < ActiveRecord::Migration[6.0]
  def change
    remove_column :books, :c_day, :string
    remove_column :books, :i_day, :string
  end
end
