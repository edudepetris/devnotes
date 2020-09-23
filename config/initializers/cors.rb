# Rack::Cors provides support for Cross-Origin Resource Sharing (CORS) for Rack compatible web applications.
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # add my CLI origin instead of *
    origins '*'
    resource '/api/v1/*',
             headers: :any,
             methods: :any,
             max_age: 600
    # headers: %w(Authorization),
    # expose: %w(Authorization),
  end
end
