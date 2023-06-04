require 'swagger_helper'

describe 'survey API' do
  
  path '/api/v1/survey/{id}/add_survey_instance_selection' do

    post 'Creates a Survey Question' do
      tags 'survey'
      consumes 'application/json', 'application/xml'
      parameter name: :survey, in: :body, schema: {
        type: :object,
        properties: {
          instance_id: {type: :integer},
          question_id: {type: :integer},
          selection_id: {type: :integer},
          other_choice_text: {type: :string}
        },
        required: [ 'instance_id', 'question_id', 'selection_id', 'other_choice_text']
      }

      response '201', 'survey question created' do
        # let(:survey_id) { Survey.create(name: 'foo', description: 'bar').id }
        # let(:survey_question_id) { SurveyQuestion.create(question_text: 'foo', survey_id: :survey_id).id }
        # let(:survey_selection_id) { SurveyQuestionSelection.create(question_text: 'foo', survey_id: :survey_id).id }
        # let(:survey) { { question_text: 'Dodo', question_selections:[], id: :id} }
        run_test!
      end

      response '422', 'invalid request' do
        # let(:id) { Survey.create(name: 'foo', description: 'bar').id }
        # let(:survey) { { title: 'foo' } }
        run_test!
      end
    end
  end
  
  path '/api/v1/survey/{id}/add_question' do

    post 'Creates a Survey Question' do
      tags 'survey'
      consumes 'application/json', 'application/xml'
      parameter name: :survey, in: :body, schema: {
        type: :object,
        properties: {
          question_text: { type: :string },
          question_selections: { type: :array }
        },
        required: [ 'question_text','question_selections']
      }

      response '201', 'survey question created' do
        let(:id) { Survey.create(name: 'foo', description: 'bar').id }
        let(:survey) { { question_text: 'Dodo', question_selections:[], id: :id} }
        run_test!
      end

      response '422', 'invalid request' do
        let(:id) { Survey.create(name: 'foo', description: 'bar').id }
        let(:survey) { { title: 'foo' } }
        run_test!
      end
    end
  end

  path '/api/v1/survey/{id}/start_survey' do
  post 'Creates a Survey Instance' do
    tags 'survey'
    consumes 'application/json', 'application/xml'
    parameter name: :survey, in: :body, schema: {
      type: :object,
      properties: {
        name: { type: :string }
      },
      required: [ 'name']
    }

    response '201', 'survey question created' do
      let(:id) { Survey.create(name: 'foo').id }
      let(:survey) { { id: :id} }
      run_test!
    end

    response '422', 'invalid request' do
      let(:id) { Survey.create(name: 'foo').id }
      let(:survey) { { title: 'foo' } }
      run_test!
    end
  end
end

  

  path '/api/v1/survey' do

    post 'Creates a Survey' do
      tags 'survey'
      consumes 'application/json', 'application/xml'
      parameter name: :survey, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          description: { type: :string }
        },
        required: [ 'name' ],
        optional:  [ 'description' ]
      }

      response '201', 'survey created' do
        let(:survey) { { name: 'Dodo'} }
        run_test!
      end

      response '422', 'invalid request' do
        let(:survey) { { title: 'foo' } }
        run_test!
      end
    end
  end

  path '/api/v1/survey/{id}' do

    get 'Retrieves a survey' do
      tags 'survey'
      produces 'application/json', 'application/xml'
      parameter name: :id, :in => :path, :type => :string

      response '200', 'name found' do
        schema type: :object,
          properties: {
            id: { type: :integer, },
            name: { type: :string },
            description: { type: :string },
            surevey_questions: { type: :array }
          },
          required: [ 'id', 'name', 'description' ]

          let(:id) { Survey.create(name: 'foo', description: 'bar').id }
        run_test!
      end

      response '404', 'survey not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end


  path '/api/v1/survey_questions/{id}' do

    get 'Retrieves a survey question' do
      tags 'survey'
      produces 'application/json', 'application/xml'
      parameter name: :id, :in => :path, :type => :string

      response '200', 'name found' do
        schema type: :object,
          properties: {
          id: { type: :integer, },            
          question_text: { type: :string },
          question_selections: { type: :array }
          },
          required: [ 'id', 'question_text', 'question_selections' ]

          let(:survey_id) { Survey.create(name: 'foo', description: 'bar').id }
          let(:id) { SurveyQuestion.create(question_text: 'foo', survey_id: :survey_id).id }
        run_test!
      end

      response '404', 'survey not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end

  path '/api/v1/survey/{id}/get_results' do
    get 'Retrieves survey results' do
      tags 'survey'
      produces 'application/json', 'application/xml'
      parameter name: :id, :in => :path, :type => :string

      response '200', 'name found' do
        schema type: :object,
          properties: {
            results: { type: :array }
          },
          required: [ 'results' ]

          let(:id) { Survey.create(name: 'foo', description: 'bar').id }
        run_test!
      end

      response '404', 'survey not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end
  # path '/api/v1/surveys' do

  #   get 'Retrieves surveys' do
  #     tags 'survey'
  #     produces 'application/json', 'application/xml'
  #     parameter name: :id, :in => :path, :type => :string

  #     response '200', 'name found' do
  #       schema type: :object,
  #         properties: {
  #           id: { type: :integer, },
  #           name: { type: :string },
  #           description: { type: :string },
  #         },
  #         required: [ 'id', 'name', 'description' ]

  #       let(:id) { Survey.create(name: 'foo', description: 'bar').id }
  #       run_test!
  #     end

  #     response '404', 'survey not found' do
  #       let(:id) { 'invalid' }
  #       run_test!
  #     end
  #   end
  # end
end