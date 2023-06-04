# Todo rename survey_instance to survey_response
class CreateSurveyInstances < ActiveRecord::Migration[7.0]
  def change
    create_table :survey_instances do |t|
      t.references :survey, null: false, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
