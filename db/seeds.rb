# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# SurveyQuestion.destroy_all
# Survey.destroy_all

Survey.create!([
                 {
                   name: 'TeamSense Survey',
                   description: 'This is the survey for TeamSense as per the project requirements',
                   created_at: 1.week.ago
                 },
                 {
                   name: 'Survey 2',
                   description: 'This is the second survey',
                   created_at: 2.weeks.ago
                 },
                 {
                   name: 'Survey 3',
                   description: 'This is the third survey',
                   created_at: 3.weeks.ago
                 }
               ])
p "Created #{Survey.count} surveys"

# Create some questions for TeamSense Survey
survey1 = Survey.find_by(name: 'TeamSense Survey')
survey1.survey_questions.create!([
                                   {
                                     question_text: 'What is your favorite color?',
                                     created_at: 1.day.ago
                                   },
                                   {
                                     question_text: 'What is your favorite food?',
                                     created_at: 2.days.ago
                                   }
                                 ])

# Create some questions for Survey 2
survey2 = Survey.find_by(name: 'Survey 2')
survey2.survey_questions.create!([
                                   {
                                     question_text: 'What is your favorite movie?',
                                     created_at: 3.days.ago
                                   },
                                   {
                                     question_text: 'What is your favorite book?',
                                     created_at: 4.days.ago
                                   }
                                 ])

# Create some questions for Survey 3
survey3 = Survey.find_by(name: 'Survey 3')
survey3.survey_questions.create!([
                                   {
                                     question_text: 'What is your favorite animal?',
                                     created_at: 5.days.ago
                                   },
                                   {
                                     question_text: 'What is your favorite hobby?',
                                     created_at: 6.days.ago
                                   },

                                   {
                                     question_text: 'What is your favorite movie?',
                                     created_at: 3.days.ago
                                   },
                                   {
                                     question_text: 'What is your favorite book?',
                                     created_at: 4.days.ago
                                   },
                                   {
                                     question_text: 'What is your favorite color?',
                                     created_at: 1.day.ago
                                   },
                                   {
                                     question_text: 'What is your favorite food?',
                                     created_at: 2.days.ago
                                   }
                                 ])

p "Created #{Survey.count} surveys and #{SurveyQuestion.count} questions"

# Create some selections for Survey 1 Question 1
question1 = SurveyQuestion.where(question_text: 'What is your favorite color?').each do |question|
  question.survey_question_selections.create!([
                                                {
                                                  selection_choice: 'Red',
                                                  selection_type: 'radio',
                                                  created_at: 1.day.ago
                                                },
                                                {
                                                  selection_choice: 'Blue',
                                                  selection_type: 'radio',
                                                  created_at: 2.days.ago
                                                },
                                                {
                                                  selection_choice: 'Green',
                                                  selection_type: 'radio',
                                                  created_at: 3.days.ago
                                                },
                                                {
                                                  selection_choice: 'Other',
                                                  selection_type: 'other',
                                                  created_at: 3.days.ago
                                                }
                                              ])
end

# Create some selections for Survey 1 Question 2
question2 = SurveyQuestion.where(question_text: 'What is your favorite food?').each do |question|
  question.survey_question_selections.create!([
                                                {
                                                  selection_choice: 'Chicken Fettiucini Alfredo',
                                                  selection_type: 'radio',
                                                  created_at: 4.days.ago
                                                },
                                                {
                                                  selection_choice: 'Ceasar Salad',
                                                  selection_type: 'radio',
                                                  created_at: 5.days.ago
                                                },
                                                {
                                                  selection_choice: 'Massaman Curry',
                                                  selection_type: 'radio',
                                                  created_at: 6.days.ago
                                                },
                                                {
                                                  selection_choice: 'Other',
                                                  selection_type: 'other',
                                                  created_at: 3.days.ago
                                                }
                                              ])
end

# Create some selections for Survey 2 Question 1
question3 = SurveyQuestion.where(question_text: 'What is your favorite movie?').each do |question|
  question.survey_question_selections.create!([
                                                {
                                                  selection_choice: 'Star Wars',
                                                  selection_type: 'radio',
                                                  created_at: 7.days.ago
                                                },
                                                {
                                                  selection_choice: 'Lord of the Rings',
                                                  selection_type: 'radio',
                                                  created_at: 8.days.ago
                                                },
                                                {
                                                  selection_choice: 'Terminator',
                                                  selection_type: 'radio',
                                                  created_at: 9.days.ago
                                                },
                                                {
                                                  selection_choice: 'Other',
                                                  selection_type: 'other',
                                                  created_at: 3.days.ago
                                                }
                                              ])
end

# Create some selections for Survey 2 Question 2
question4 = SurveyQuestion.where(question_text: 'What is your favorite book?').each do |question|
  question.survey_question_selections.create!([
                                                {
                                                  selection_choice: 'The Hobbit',
                                                  selection_type: 'radio',
                                                  created_at: 10.days.ago
                                                },
                                                {
                                                  selection_choice: 'The Lord of the Rings',
                                                  selection_type: 'radio',
                                                  created_at: 11.days.ago
                                                },
                                                {
                                                  selection_choice: 'The Silmarillion',
                                                  selection_type: 'radio',
                                                  created_at: 12.days.ago
                                                },
                                                {
                                                  selection_choice: 'Other',
                                                  selection_type: 'other',
                                                  created_at: 3.days.ago
                                                }
                                              ])
end

# Create some selections for Survey 3 Question 1
question5 = SurveyQuestion.where(question_text: 'What is your favorite animal?').each do |question|
  question.survey_question_selections.create!([
                                                {
                                                  selection_choice: 'Dog',
                                                  selection_type: 'radio',
                                                  created_at: 13.days.ago
                                                },
                                                {
                                                  selection_choice: 'Cat',
                                                  selection_type: 'radio',
                                                  created_at: 14.days.ago
                                                },
                                                {
                                                  selection_choice: 'Bird',
                                                  selection_type: 'radio',
                                                  created_at: 15.days.ago
                                                },
                                                {
                                                  selection_choice: 'Other',
                                                  selection_type: 'other',
                                                  created_at: 3.days.ago
                                                }
                                              ])
end

# Create some selections for Survey 3 Question 2
question6 = SurveyQuestion.where(question_text: 'What is your favorite hobby?').each do |question|
  question.survey_question_selections.create!([
                                                {
                                                  selection_choice: 'Reading',
                                                  selection_type: 'radio',
                                                  created_at: 16.days.ago
                                                },
                                                {
                                                  selection_choice: 'Writing',
                                                  selection_type: 'radio',
                                                  created_at: 17.days.ago
                                                },
                                                {
                                                  selection_choice: 'Drawing',
                                                  selection_type: 'radio',
                                                  created_at: 18.days.ago
                                                },
                                                {
                                                  selection_choice: 'Other',
                                                  selection_type: 'other',
                                                  created_at: 3.days.ago
                                                }
                                              ])
end

p "Created #{SurveyQuestionSelection.count} selections"

# Create some responses for Survey 1 Question 1
# survey1_question1 = SurveyQuestion.where(survey_id: survey1.id, text: "What is your favorite color?").each do |question|
# survey_question1.responses.create!([
#   {
#     text: "Red",
#     created_at: 1.hour.ago
#   },
#   {
#     text: "Blue",
#     created_at: 2.hours.ago
#   },
#   {
#     text: "Green",
#     created_at: 3.hours.ago
#   }
# ])

# p "Created #{Response.count} responses"
