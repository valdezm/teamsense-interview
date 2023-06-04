class Api::V1::SurveysController < ApplicationController
  before_action :set_api_v1_survey, only: %i[show update destroy add_question start_survey get_results]

  # GET /api/v1/surveys
  def index
    @surveys = Survey.all

    render json: @surveys
  end

  def add_question
    @surevey_question = SurveyQuestion.create(survey_id: @survey.id, question_text: params[:question_text])

    puts 'selesctionsd'
    puts params[:question_selections].inspect
    if @surevey_question.save!
      render json: @surevey_question, status: :created
      params[:question_selections].each do |selection|
        puts 'selection'
        puts selection.inspect
        @survey_question_selection = SurveyQuestionSelection.create(survey_question_id: @surevey_question.id,
                                                                    selection_choice: selection[:selection_choice], selection_type: selection[:selection_type])
        puts @survey_question_selection.inspect
      end
    else
      render json: @survey_question.errors, status: :unprocessable_entity
    end
  end

  def start_survey
    puts params[:name]
    @surevey_instance = SurveyInstance.create(survey_id: @survey.id, name: params[:name])

    if @surevey_instance.save!
      render json: @surevey_instance, status: :created
    else
      render json: @survey_instance.errors, status: :unprocessable_entity
    end
  end

  # GET /api/v1/surveys/1
  def show
    render json: @survey.to_json(include: :survey_questions)
  end

  def get_results
    results = []
    @survey.survey_questions.each do |question|
      selection_results = []
      question.survey_question_selections.each do |selection|
        selection_results << { selection_choice: selection.selection_choice, count: selection.survey_i_selections.count,
                               other: selection.survey_i_selections.collect(&:other_choice_text) }
      end
      results << { question_text: question.question_text, selection_results: selection_results }
    end
    render json: results
  end

  def add_survey_instance_selection
    puts params[:name]
    @surevey_instance_selection = SurveyISelection.create(survey_instance_id: params[:instance_id],
                                                          survey_question_id: params[:question_id], survey_question_selection_id: params[:selection_id], other_choice_text: params[:other_choice_text])

    if @surevey_instance_selection.save!
      render json: @surevey_instance_selection, status: :created
    else
      render json: @surevey_instance_selection.errors, status: :unprocessable_entity
    end
  end

  # GET /api/v1/surveys/1
  def show
    render json: @survey.to_json(include: :survey_questions)
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
    @survey = Survey.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def api_v1_survey_params
    params.fetch(:survey).permit(:name, :description)
  end

  def api_v1_survey_questions_params
    params.fetch(:survey).permit(:question_text, question_selections: %i[selection_type selection_choice])
  end
end
