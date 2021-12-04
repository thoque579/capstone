module Api
  class MessagesController < ApplicationController
    def create

      # code
      @message = Message.create({username: params[:message][:username], message: params[:message][:message]})

      if @message.save
        render '/api/messages/create', status: :created
      else
        render json: { error: @message.errors }, status: :bad_request
      end
    end

    def show
      # code
      @messages = Message.all
      render json: { message: @messages }
    end


    def delete
      # code
      @message = Message.all

      if @message.delete_all
        render json: { success: 'deleted'}
      else
        render json: { error: 'something went wrong'}
      end
    end

    private
    def message_params
      params.require(:message).permit(:message)
      # code
    end

  end
end
