# teamsense-interview

## Update
I have built a frontend conatiner just `cd client && docker compose up --build` and then you can run `docker compose up --build` in this root directory to get the backend up.
Checkout out the google doc for a screenshot of what all container output looks like.



## Old, commented out in original Dockerfile
Docker works, however it appears some routes in the API are conflicting with the front end routes, leading the page to crash, specifically, when taking the survey at `http://localhost:3000/survey/4/take/3/11`

the API thinks it is a route it owns and returns a 404.

That is a client/front route though.

So best to run this on ports 5173 for the frontend consuming the backend on port 3000.

Until I fix that.

However if you want to run docker `docker compose up --build` will work



LOCAL
to run locally:

backend(in root directory):
`bundle install`
`rails db:migrate`
`rails db:seed`

front(in client directory)
`npm install`
`npm run dev`

docker image will be updated this evening 6/4/23

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
