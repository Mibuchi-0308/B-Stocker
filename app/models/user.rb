class User < ApplicationRecord
  validates :name, {presence: true}
  validates :e_mail, {presence: true}
  validates :password, {presence: true}
end
