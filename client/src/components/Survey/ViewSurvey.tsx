import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useGetSurvey from "../../api/useGetSurvey";
import { Survey } from "../../model/Survey";

export const ViewSurvey = () => {
  const params = useParams();
  //api
  const [getSurvey] = useGetSurvey();
  const defaultSurvey: Survey = {
    name: "Survey Not Found",
    description: "",
    survey_questions: [],
    id: -1,
    created_at: "",
    updated_at: "",
  };
  const [survey, setSurvey] = useState<Survey>(defaultSurvey);

  useEffect(() => {
    getSurvey(params.id as string).then((survey) => {
      setSurvey(survey || defaultSurvey);
    });
  }, []);

  return (
    <div className="album py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4 box-shadow">
              <div className="card-body">
                <p className="card-text">
                  Name of Survey: {survey.name}
                  <br />
                  Description: {survey.description}
                  <br />
                  Number of Questions: {survey.survey_questions.length}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      <Link to={`/survey/${survey.id}/edit`}>Add Question</Link>
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      disabled={survey.survey_questions.length === 0}
                    >
                      <Link to={`/survey/${survey.id}/take/0`}>
                        Take Survey
                      </Link>
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      disabled={survey.survey_questions.length === 0}
                    >
                      <Link to={`/survey/${survey.id}/take/-1/completed`}>
                        View Results
                      </Link>
                    </button>

                    <button
                      type="button"
                      disabled={true}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      <Link to={`/survey/${survey.id}/edit`}>Edit (TBD)</Link>
                    </button>
                  </div>

                  <div>
                    <ul>
                      {survey.survey_questions.map((selection, index) => {
                        return (
                          <li key={index} className="form-check">
                            <label
                              className="form-check-label"
                              htmlFor="exampleRadios1"
                            >
                              {selection.question_text}
                              <a
                                style={{ padding: "10px" }}
                                href="#"
                                aria-disabled={true}
                                onClick={(e) => console.log(e, selection)}
                              >
                                <span className="text-danger">
                                  Remove (TBD)
                                </span>
                              </a>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <small className="text-muted">
                    Last Update: {survey.updated_at}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
