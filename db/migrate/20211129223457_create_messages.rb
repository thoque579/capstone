class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.string :message
      t.belongs_to :user, index: true, foreign_key: true
      t.timestamps
    end
  end
end
