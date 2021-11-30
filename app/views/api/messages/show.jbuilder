json.messages do
  json.array! @messages do |message|
    json.message @message.message
  end
end
