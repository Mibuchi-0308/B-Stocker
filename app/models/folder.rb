class Folder < ApplicationRecord
  validates :name, {presence: true, uniqueness: true}
end
