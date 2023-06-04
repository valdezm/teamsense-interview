import { Survey } from '../model/Survey';
import { SurveyQuestion } from '../model/SurveyQuestion';
import { Api } from './v9/myApi';
import { useState } from "react";

type GetSurveyQuestion = [(id: string) => Promise<void | SurveyQuestion>];

// enum Marks {
//     A = 10,
//     B = 20,
//     C = 30,
//     D = 40,
//     E = 50,
//     F = 60,
// }

// export default function useMarksHook(initialNumber: number = 10): MarkHook {
//     console.log(Marks.A)
//     const [marks, setMarks] = useState<number>(initialNumber);
//     const incrementCount = (multiple: number = 3): void => {
//         setMarks((prevState) => prevState * multiple);
//     };

//     return [marks, incrementCount];
// }


export default function useGetSurveyResults(): GetSurveyQuestion {

    const api = new Api();

    const getSurveyResults = function (id: string): Promise<void | SurveyQuestion> {

        return api.api.v1SurveyGetResultsDetail(id)
            .then((response) => response.data)
            .catch((error) => console.error('Error creating survey:', error));
    }

    return [getSurveyResults];
}