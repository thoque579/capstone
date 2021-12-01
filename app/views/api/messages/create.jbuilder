json.userMessage do
  json.message @message.message
  json.username @message.username
  json.errors []
end
