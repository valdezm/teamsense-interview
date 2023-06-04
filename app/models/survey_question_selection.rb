class SurveyQuestionSelection < ApplicationRecord
  belongs_to :survey_question
  has_many :survey_i_selections
end
