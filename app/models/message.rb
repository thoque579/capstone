class Message < ApplicationRecord

  validates :message, presence: true, length: { maximum: 300 }
end
