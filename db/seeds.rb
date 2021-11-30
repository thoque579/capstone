# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

tom = User.create!([
  {username: "bee4"},
  {username: "bee2"},
  {username: "bee3"},
  {username: "bee6"},
  {username:  "bee7"},
  {username: "bee8"},
  {username:  "bee9"},
  {username:  "bee10"},
  {username: "bee13"},
  ])

messageTest = Message.create!([

  {message: "TESTETESTE", user_id:"6"},
  {message: "test", user_id: "7"},
  {message: "TESTETESTE", user_id:"8"},
  {message: "TESTETESTE", user_id:"9"},
  {message: "TESTETESTE", user_id:"1"},
  {message: "TESTETESTE", user_id:"2"},
  {message: "TESTETESTE", user_id:"3"},

  ])
