# Render the user notes.
class Api::Frontend::V1::NotesController < ApplicationController
  before_action :authenticate_user!

  def show
    note = current_user.notes.find(params[:id])
    render json: note
  end
end
