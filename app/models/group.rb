class Group < ApplicationRecord
  validates :groupName, presence: true
end
