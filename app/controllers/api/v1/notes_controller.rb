# For CLI client
class Api::V1::NotesController < ApiController
  before_action :authenticate_user!

  def update
    note = current_user.notes.find(params[:id])
    note.update!(note_params)
  end

  def create
    current_user.notes.create!(note_params)
  end

  private

  def note_params
    params.require(:note).permit(:content, :project_name)
  end
end
