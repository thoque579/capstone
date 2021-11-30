module Api
  class UsersController < ApplicationController
    def createGuest
      @user = User.create(username: params[:user][:username])
      if @user.save
        render json: { success: true, errors: []}, status: :created
      else
        render json: { success: false, errors: @user.errors }, status: :bad_request
      end
    end

    private

    def user_params
      params.require(:user).permit(:username)
    end
  end
end
