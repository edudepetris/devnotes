# For CLI client
class Api::V1::NotesController < ApiController
  before_action :set_user

  def index
    render json: @user.notes
  end

  private

  def set_user
    # usecurrent_user
    @user = User.last
  end
end
