Rails.application.routes.draw { 
    root "api#versions" 
    get "/api/versions", to: "api#versions"
    
    mount Rswag::Api::Engine => 'api-docs'
    mount Rswag::Ui::Engine => 'docs'

    post "api/v1/survey/:id/add_survey_instance_selection", to: "api/v1/surveys#add_survey_instance_selection"
    post "api/v1/survey/:id/add_question", to: "api/v1/surveys#add_question"
    post "api/v1/survey/:id/start_survey", to: "api/v1/surveys#start_survey"
    post "api/v1/survey", to: "api/v1/surveys#create"
    get "api/v1/survey/:id", to: "api/v1/surveys#show"
    get "api/v1/survey/:id/question/:id", to: "api/v1/surveys#get_question"
    get "api/v1/survey/:id/get_results", to: "api/v1/surveys#get_results"
    
    
    
    get "api/v1/survey_questions/:id", to: "api/v1/survey_questions#show"
}
