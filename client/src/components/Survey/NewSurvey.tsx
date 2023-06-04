// src/components/main.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useNewSurvey from "../../api/useNewSurvey";

export const NewSurvey = () => {
  //state
  const [newSurveyName, setNewSurveyName] = useState<string>("");
  const [newSurveyDescription, setNewSurveyDescription] = useState<
    string | undefined
  >();

  //api
  const [createSurvey] = useNewSurvey();

  const navigate = useNavigate();

  const createNewSurvey = () => {
    createSurvey(newSurveyName, newSurveyDescription)
      .then((survey) => {
        console.log(survey);
        if (survey) navigate(`/survey/${survey.id}`);
      })
      .catch((error) => {
        console.error("Error creating survey:", error);
      });
  };

  return (
    <div className="album py-5">
      <div className="container">
        <div className="row col-md-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="text-centered bg-white"
          >
            <div className="form-group">
              <label htmlFor="SurveyyName">
                Name{" "}
                <span className="text-danger" title="This field is required.">
                  *
                </span>
              </label>
              <input
                onInput={(e) => setNewSurveyName(e.target.value)}
                type="text"
                className="form-control"
                id="name"
                aria-describedby="SurveyyNameHelp"
                placeholder="Name of the Survey"
              />
              <small id="SurveyyNameHelp" className="form-text text-muted">
                Required, e.g. "Team Icebreaker"
              </small>
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="SurveyyDescription">Description</label>
              <input
                onInput={(e) => setNewSurveyDescription(e.target.value)}
                type="text"
                className="form-control"
                id="description"
                aria-describedby="SurveyyDescriptionHelp"
                placeholder="Description goes here"
              />
              <small
                id="SurveyyDescriptionHelp"
                className="form-text text-muted"
              >
                Optional
              </small>
            </div>
          </form>
          <div className="row col-md-6">
            <button
              disabled={!newSurveyName}
              className="btn btn-lg btn-primary m-2"
              onClick={() => createNewSurvey()}
            >
              Create New Survey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
