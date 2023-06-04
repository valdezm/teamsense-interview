# Todo: rename survey_i_selections to survey_response_slections
# survey_i_selections was initially survey_instance_selection (to be renamed to survey_response), but the table name was too long, so I just used i short for instance
class CreateSurveyISelections < ActiveRecord::Migration[7.0]
  def change
    create_table :survey_i_selections do |t|
      t.references :survey_instance, null: false, foreign_key: true
      t.references :survey_question, null: false, foreign_key: true
      t.references :survey_question_selection, null: false, foreign_key: true
      t.string :other_choice_text

      t.timestamps
    end
  end
end
