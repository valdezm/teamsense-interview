class SurveyISelection < ApplicationRecord
  belongs_to :survey_instance
  belongs_to :survey_question
  belongs_to :survey_question_selection
end
