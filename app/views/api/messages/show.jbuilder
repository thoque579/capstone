json.messages do
  json.array! @messages do |message|
    json.message @message.message
    json.username  @message.username
  end
end
