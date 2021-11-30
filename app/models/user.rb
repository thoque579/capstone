class User < ApplicationRecord
  has_many :messages
  has_many :sessions

  validates :username, presence: true, length: { minimum: 3 , maximum: 64 }
  validates_uniqueness_of :username
end
