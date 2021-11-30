module Api
  class MessagesController < ApplicationController
    def create
      token = cookies.signed[:group_chat_session_token]
      puts(token)
      session = Session.find_by(token: token)
      user = session.user

      # code
      @message = user.messages.create(message_params)

      if @message.save
        render '/api/messages/create', status: :created
      else
        render json: { error: @message.errors }, status: :bad_request
      end
    end

    def show
      # code
      @messages = Message.all
      puts(@messages)
      render json: { message: @messages }
    end


    private
    def message_params
      params.require(:message).permit(:message)
      # code
    end

  end
end
