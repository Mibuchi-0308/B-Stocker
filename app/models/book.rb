class Book < ApplicationRecord
  validates :name, {presence: true}
  validates :user_id, {presence: true}
  validates :c_day, {presence: true}
  validates :i_day, {presence: true}
end
