// src/components/main.tsx
import { Route, Routes } from "react-router-dom";
import { Jumbotron } from "./Jumbotron";
import { NewSurvey } from "./Survey/NewSurvey";
import { ViewSurvey } from "./Survey/ViewSurvey";
import { EditSurvey } from "./Survey/EditSurvey";
import { TakeSurvey } from "./Survey/TakeSurvey";

export const Main = () => {
  return (
    <main role="main">
      <Routes>
        <Route path="/" element={<Jumbotron />} />
        <Route path="/new-survey" element={<NewSurvey />} />
        <Route path="/survey/:id" element={<ViewSurvey />} />
        <Route path="/survey/:id/edit" element={<EditSurvey />} />
        <Route path="/survey/:id/take/:step" element={<TakeSurvey />} />

        <Route
          path="/survey/:id/take/:instance/:step"
          element={<TakeSurvey />}
        />
      </Routes>
    </main>
  );
};
