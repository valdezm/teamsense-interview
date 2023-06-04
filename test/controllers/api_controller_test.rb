require "test_helper"

class ApiControllerTest < ActionDispatch::IntegrationTest
  test "should get versions" do
    get api_versions_url
    assert_response :success
  end
end
