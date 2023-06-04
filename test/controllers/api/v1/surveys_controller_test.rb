require "test_helper"

class Api::V1::SurveysControllerTest < ActionDispatch::IntegrationTest
  setup do
    @api_v1_survey = api_v1_surveys(:one)
  end

  test "should get index" do
    get api_v1_surveys_url, as: :json
    assert_response :success
  end

  test "should create api_v1_survey" do
    assert_difference("Api::V1::Survey.count") do
      post api_v1_surveys_url, params: { api_v1_survey: {  } }, as: :json
    end

    assert_response :created
  end

  test "should show api_v1_survey" do
    get api_v1_survey_url(@api_v1_survey), as: :json
    assert_response :success
  end

  test "should update api_v1_survey" do
    patch api_v1_survey_url(@api_v1_survey), params: { api_v1_survey: {  } }, as: :json
    assert_response :success
  end

  test "should destroy api_v1_survey" do
    assert_difference("Api::V1::Survey.count", -1) do
      delete api_v1_survey_url(@api_v1_survey), as: :json
    end

    assert_response :no_content
  end
end
