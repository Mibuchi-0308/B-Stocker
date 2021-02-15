class Order < ApplicationRecord
  validates :customer_id, {presence: true}
  validates :book_id, {presence: true}
  validates :amount, {presence: true}
end
