// src/components/main.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useEditSurvey from "../../api/useEditSurvey";
import useGetSurvey from "../../api/useGetSurvey";
import { Survey } from "../../model/Survey";

export const EditSurvey = () => {
  const [editSurvey] = useEditSurvey();

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

  const navigate = useNavigate();

  useEffect(() => {
    getSurvey(params.id as string).then((survey) => {
      setSurvey(survey || defaultSurvey);
    });
  }, []);

  const createNewSurveyQuestion = () => {
    let selections = [];
    editSurveyQuestionSelection.map((selection) => {
      selections.push({
        selection_choice: selection,
        selection_type: "radio",
      });
    });

    if (editSurveyQuestionSelectionOther) {
      selections.push({ selection_choice: "Other", selection_type: "other" });
    }

    editSurvey(survey.id.toString(), editSurveyQuestion, selections)
      .then(() => {
        // if (survey)
        navigate(`/survey/${survey.id}`);
      })
      .catch((error) => {
        console.error("Error creating survey questions:", error);
      });
  };

  //state
  const [editSurveyQuestion, setEditSurveyQuestion] = useState<string>("");
  const [currentSelection, setCurrentSelection] = useState<string>("");
  const [editSurveyQuestionSelection, setEditSurveyQuestionSelection] =
    useState<any[]>([]);
  const [
    editSurveyQuestionSelectionOther,
    setEditSurveyQuestionSelectionOther,
  ] = useState<boolean>(false);

  const addSelection = (e) => {
    e.preventDefault();
    if (currentSelection === "") return;
    setEditSurveyQuestionSelection([
      ...editSurveyQuestionSelection,
      currentSelection,
    ]);
    setCurrentSelection("");

    // console.log(editSurveyQuestionSelection)
  };

  const removeSelection = (e, removal: string) => {
    e.preventDefault();

    console.log(removal);
    setEditSurveyQuestionSelection(
      editSurveyQuestionSelection.filter((selection) => selection !== removal)
    );
  };

  return (
    <div className="album py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="text-centered bg-white"
            >
              <div className="form-group">
                <label htmlFor="SurveyQuestion">
                  Survey Question{" "}
                  <span className="text-danger" title="This field is required.">
                    *
                  </span>
                </label>
                <input
                  onInput={(e) => setEditSurveyQuestion(e.target.value)}
                  type="text"
                  className="form-control"
                  id="name"
                  aria-describedby="SurveyQuestionHelp"
                  placeholder="Question"
                />
                <small id="SurveyQuestionHelp" className="form-text text-muted">
                  Required, e.g. "What is your favorite food?"
                </small>
              </div>
              <br />

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="exampleRadios"
                  id="exampleRadios1"
                  checked={editSurveyQuestionSelectionOther}
                  onChange={() => {
                    setEditSurveyQuestionSelectionOther(
                      !editSurveyQuestionSelectionOther
                    );
                  }}
                />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Other option?
                </label>
                <br />

                <small
                  id="SurveyQuestionSelectionHelp"
                  className="form-text text-muted"
                >
                  This is used to provide the Survey user to fill in a custom
                  value.
                </small>
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="SurveyQuestionSelection">
                  Selection{" "}
                  <span className="text-danger" title="This field is required.">
                    *
                  </span>
                </label>
                <button
                  className="btn btn-sm btn-secondary m-2"
                  onClick={(e) => addSelection(e)}
                >
                  Add Selection
                </button>
                <input
                  value={currentSelection}
                  onInput={(e) => setCurrentSelection(e.target.value)}
                  type="text"
                  className="form-control"
                  id="name"
                  aria-describedby="SurveyQuestionSelectionHelp"
                  placeholder="Question Choice"
                />

                <small
                  id="SurveyQuestionSelectionHelp"
                  className="form-text text-muted"
                >
                  Required, e.g. "Apple"
                </small>
              </div>
              <br />
            </form>
          </div>

          <div className="col-md-6" style={{ backgroundColor: "#fff" }}>
            <h1>{editSurveyQuestion}</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {editSurveyQuestionSelection.map((selection, index) => {
                return (
                  <div key={index} className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios1"
                      value="option1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios1"
                    >
                      {selection}
                      <a
                        style={{ padding: "10px" }}
                        href="#"
                        onClick={(e) => removeSelection(e, selection)}
                      >
                        <span className="text-danger">Remove</span>
                      </a>
                    </label>
                  </div>
                );
              })}
              {editSurveyQuestionSelectionOther && (
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="other"
                  />
                  <label className="form-check-label" htmlFor="exampleRadios1">
                    Other
                    <span style={{ padding: 10 }}>
                      <input type="text"></input>{" "}
                    </span>
                  </label>
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="row col-md-3 align-items-center">
          <button
            disabled={!editSurveyQuestion}
            className="btn btn-lg btn-primary m-2"
            onClick={() => createNewSurveyQuestion()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
