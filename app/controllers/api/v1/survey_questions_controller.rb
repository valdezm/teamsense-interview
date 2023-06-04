class Api::V1::SurveyQuestionsController < ApplicationController
  before_action :set_api_v1_survey, only: %i[ show update destroy ]

  # GET /api/v1/surveys
  def index
    @surveys = Survey.all

    render json: @surveys
  end

  # GET /api/v1/surveys/1
  def show
    # puts @survey.inspect
    render json: @survey.to_json(include: :survey_question_selections)
  end

  # POST /api/v1/surveys
  def create
    @survey = Survey.new(api_v1_survey_params)
    puts @survey.inspect

    if @survey.save!
      render json: @survey, status: :created
    else
      render json: @survey.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/surveys/1
  def update
    if @survey.update(api_v1_survey_params)
      render json: @survey
    else
      render json: @survey.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/surveys/1
  def destroy
    @survey.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_api_v1_survey
      @survey = SurveyQuestion.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def api_v1_survey_params
      params.fetch(:survey).permit(:name, :description)
    end
end
