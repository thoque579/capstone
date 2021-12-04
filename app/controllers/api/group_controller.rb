module Api
  class GroupController < ApplicationController
    def getGroup
      @group = Group.all
      render json: { group: @group }, status: :ok
    end

    def update
      @group = Group.find_by(params[:group][:id])
      puts(@group.groupName)

      if @group.update(params.require(:group).permit(:id, :groupName))
        render json: { group: @group }
      end

      render json: { error: 'fail' }, status: :not_found if !@group
    end






  end
end
