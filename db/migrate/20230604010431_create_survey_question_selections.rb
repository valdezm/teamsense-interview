class CreateSurveyQuestionSelections < ActiveRecord::Migration[7.0]
  def change
    create_table :survey_question_selections do |t|
      t.string :selection_type
      t.string :selection_choice
      t.references :survey_question, null: false, foreign_key: true

      t.timestamps
    end
  end
end
