// src/components/main.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAddInstanceSelection from "../../api/useAddInstanceSelectionSurvey";
import useGetSurvey from "../../api/useGetSurvey";
import useGetSurveyQuestions from "../../api/useGetSurveyQuestions";
import useGetSurveyResults from "../../api/useGetSurveyResults";
import useTakeSurvey from "../../api/useTakeSurvey";
import { Survey } from "../../model/Survey";
import { SurveyQuestion } from "../../model/SurveyQuestion";

export const TakeSurvey = () => {
  const [takeSurvey] = useTakeSurvey();

  const params = useParams();
  //api
  const [getSurvey] = useGetSurvey();
  const [getSurveyQuestion] = useGetSurveyQuestions();
  const [getSurveyResults] = useGetSurveyResults();
  const defaultSurvey: Survey = {
    name: "Survey Not Found",
    description: "",
    survey_questions: [],
    id: -1,
    created_at: "",
    updated_at: "",
  };
  const defaultSurveyQuestion: SurveyQuestion = {
    question_text: "Survey Not Found",
    survey_question_selections: [],
    id: -1,
  };
  const [results, setResults] = useState([]);
  const [choice, setChoice] = useState();
  const [otherText, setOtherText] = useState<string>("");
  const [survey, setSurvey] = useState<Survey>(defaultSurvey);
  const [surveyQuestion, setSurveyQuestion] = useState<SurveyQuestion>(
    defaultSurveyQuestion
  );
  const [nextStep, setNextStep] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    getSurvey(params.id as string).then((survey) => {
      setSurvey(survey || defaultSurvey);
      // survey.survey_questions
    });
    if (params.step === "completed") {
      getSurveyResults(params.id as string).then((surveyResults) => {
        // console.log(survey)
        setResults(surveyResults);
        // setSurveyQuestion(survey || defaultSurveyQuestion)
        // console.log(surveyQuestion)
        // survey.survey_questions
      });
    } else {
      if (params.step !== "0")
        getSurveyQuestion(params.step as string).then((survey) => {
          console.log(survey);
          setSurveyQuestion(survey || defaultSurveyQuestion);
          console.log(surveyQuestion);
          // survey.survey_questions
        });
    }
  }, []);

  useEffect(() => {
    if (survey.survey_questions.length > 0) {
      const sorted_question = survey.survey_questions.sort((a, b) =>
        a.id > b.id ? 1 : -1
      );
      if (params.step === "0") {
        setNextStep(sorted_question[0].id);
      } else {
        sorted_question.forEach((question, index) => {
          if (question.id.toString() === params.step) {
            if (index === sorted_question.length - 1) {
              setNextStep("-1");
            } else {
              setNextStep(sorted_question[index + 1].id);
            }
          }
          // setNextStep(sorted_question[parseInt(params.step) - 1].id)
        });
      }
    }

    console.log(nextStep);
  }, [survey, surveyQuestion]);

  const createNewSurveyQuestion = () => {
    let selections = [];
    editSurveyQuestionSelection.map((selection) => {
      selections.push({
        selection_choice: selection,
        selection_type: "selection",
      });
    });

    if (editSurveyQuestionSelectionOther) {
      selections.push({ selection_choice: "Other", selection_type: "other" });
    }
  };

  //state
  const [name, setName] = useState<string>("");
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

  const [addInstanceSelection] = useAddInstanceSelection();
  function proccessSurvey() {
    if (params.step === "0") {
      takeSurvey(survey.id.toString(), name)
        .then((surveyInstance) => {
          console.log(surveyInstance);
          // if (survey)
          navigate(
            `/survey/${survey.id}/take/${surveyInstance.id}/${nextStep}`
          );
          navigate(0);
        })
        .catch((error) => {
          console.error("Error creating survey questions:", error);
        });
    } else {
      console.log(choice, otherText);
      const instance_id = Number(params.instance);
      const question_id = Number(params.step);
      const choice_id = choice.id;

      addInstanceSelection(
        survey.id.toString(),
        instance_id,
        question_id,
        choice_id,
        otherText
      ).then(() => {
        if (nextStep === "-1") {
          navigate(`/survey/${survey.id}/take/${params.instance}/completed`);
        } else {
          navigate(`/survey/${survey.id}/take/${params.instance}/${nextStep}`);
        }

        navigate(0);
      });

      // editSurvey(survey.id.toString(), editSurveyQuestion, editSurveyQuestionSelection).then(() => {
      //     // if (survey)
      //     navigate(`/survey/${survey.id}`)
      // })
      //     .catch((error) => {
      //         console.error('Error creating survey questions:', error)
      //     });
    }
  }

  return (
    <div className="album py-5">
      <div className="container">
        <div className="row">
          {params.step === "0" && (
            <div>
              <h1>Welcome to the Survey!</h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="text-centered bg-white"
              >
                <div className="form-group">
                  <label htmlFor="SurveyyName">
                    Name{" "}
                    <span
                      className="text-danger"
                      title="This field is required."
                    >
                      *
                    </span>
                  </label>
                  <input
                    onInput={(e) => setName(e.target.value)}
                    type="text"
                    className="form-control"
                    id="name"
                    aria-describedby="SurveyyNameHelp"
                    placeholder="Your Name"
                  />
                  <small id="SurveyyNameHelp" className="form-text text-muted">
                    Required
                  </small>
                </div>
              </form>
            </div>
          )}

          {params.step === "completed" && (
            <div>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Survey Results</h5>
                  <p className="card-text">
                    {results.length > 0 &&
                      results.map((result) => {
                        return (
                          <div>
                            <p>{result.question_text}</p>
                            <p>
                              {result.selection_results.map((choice) => {
                                return (
                                  <div>
                                    Selection: {choice.selection_choice}
                                    <br />
                                    Votes: {choice.count}
                                    {choice.selection_choice == "Other" && (
                                      <div>
                                        {" "}
                                        Other Text:{" "}
                                        {choice.other.map((otherText) => {
                                          return <li>{otherText}</li>;
                                        })}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </p>
                          </div>
                        );
                      })}
                  </p>
                </div>
              </div>
            </div>
          )}
          {surveyQuestion.question_text === "Survey Not Found" &&
            params.step !== "0" &&
            params.step !== "completed" && (
              <div
                className="spinner-border text-primary d-flex justify-content-center"
                role="status"
              ></div>
            )}
          {params.step !== "0" &&
            surveyQuestion.question_text !== "Survey Not Found" && (
              <div className="col-md-6" style={{ backgroundColor: "#fff" }}>
                <h1>{surveyQuestion.question_text}</h1>
                <form>
                  {surveyQuestion.survey_question_selections.map(
                    (selection, index) => {
                      if (selection.selection_choice === "Other") {
                        return (
                          <div key={index} className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="exampleRadios"
                              id="exampleRadios1"
                              value="other"
                              onChange={() => setChoice(selection)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleRadios1"
                            >
                              Other
                              <span style={{ padding: 10 }}>
                                <input
                                  onInput={(e) => setOtherText(e.target.value)}
                                  type="text"
                                ></input>{" "}
                              </span>
                            </label>
                          </div>
                        );
                      } else {
                        return (
                          <div key={index} className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="exampleRadios"
                              id="exampleRadios1"
                              value="option1"
                              onChange={() => setChoice(selection)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleRadios1"
                            >
                              {selection.selection_choice}
                            </label>
                          </div>
                        );
                      }
                    }
                  )}
                </form>
              </div>
            )}
        </div>
        {params.step !== "completed" && (
          <div className="row col-md-3 align-items-center">
            <button
              disabled={!name && !choice}
              className="btn btn-lg btn-primary m-2"
              onClick={() => proccessSurvey()}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
