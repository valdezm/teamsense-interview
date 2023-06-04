# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_06_04_041307) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "survey_i_selections", force: :cascade do |t|
    t.bigint "survey_instance_id", null: false
    t.bigint "survey_question_id", null: false
    t.bigint "survey_question_selection_id", null: false
    t.string "other_choice_text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["survey_instance_id"], name: "index_survey_i_selections_on_survey_instance_id"
    t.index ["survey_question_id"], name: "index_survey_i_selections_on_survey_question_id"
    t.index ["survey_question_selection_id"], name: "index_survey_i_selections_on_survey_question_selection_id"
  end

  create_table "survey_instances", force: :cascade do |t|
    t.bigint "survey_id", null: false
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["survey_id"], name: "index_survey_instances_on_survey_id"
  end

  create_table "survey_question_selections", force: :cascade do |t|
    t.string "selection_type"
    t.string "selection_choice"
    t.bigint "survey_question_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["survey_question_id"], name: "index_survey_question_selections_on_survey_question_id"
  end

  create_table "survey_questions", force: :cascade do |t|
    t.string "question_text"
    t.bigint "survey_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["survey_id"], name: "index_survey_questions_on_survey_id"
  end

  create_table "surveys", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "survey_i_selections", "survey_instances"
  add_foreign_key "survey_i_selections", "survey_question_selections"
  add_foreign_key "survey_i_selections", "survey_questions"
  add_foreign_key "survey_instances", "surveys"
  add_foreign_key "survey_question_selections", "survey_questions"
  add_foreign_key "survey_questions", "surveys"
end
