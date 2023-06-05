// src/components/jumbotron.tsx

import { Link } from "react-router-dom";

/* eslint-disable jsx-a11y/anchor-is-valid */
export const Jumbotron = () => {
  return (
    <>
      <section className="jumbotron text-center mb-0 bg-white">
        <div className="container">
          <h1 className="jumbotron-heading">Survey</h1>
          <p className="lead text-muted">
            Let's work on getting a survery together.
            <br />
            Here you have the ability to <a href="#">create a new one</a>,<br />
            <a href="#">view the results</a> of the an existing survey,
            <br />
            or <a href="#">invite others</a> into any existing ones.
            <br />
            Now, lets get started!
          </p>
          <p>
            <Link to="/new-survey" className="btn btn-primary m-2">
              New Survey
            </Link>
            <a href="#" className="btn btn-secondary m-2">
              View Results
            </a>
            <a href="#" className="btn btn-secondary m-2">
              Invite Others
            </a>
          </p>
        </div>
      </section>

      <section className="jumbotron text-center mb-0 bg-white">
        <div className="container">
          <h1 className="jumbotron-heading">Demo Surveys</h1>
          <p>
            TeamSense Survey
            <br />
            <Link to="/survey/1" className="btn btn-secondary m-2">
              Edit Survey
            </Link>
          </p>
          <p>
            Demo Survey 2
            <br />
            <Link to="/survey/2" className="btn btn-secondary m-2">
              Edit Survey
            </Link>
          </p>
          <p>
            Demo Survey 3
            <br />
            <Link to="/survey/3" className="btn btn-secondary m-2">
              Edit Survey
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};
