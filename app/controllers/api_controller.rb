class ApiController < ApplicationController
  def versions
    render json: {
      ruby: RUBY_VERSION,
      rails: Rails::VERSION::STRING
    }
  end
end
