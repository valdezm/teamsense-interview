import { Survey } from '../model/Survey';
import { Api } from './v4/myApi';
import { useState } from "react";

type NewSurvey = [(name: string, description?: string) => Promise<void | Survey>];

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


export default function useGetSurvey(): NewSurvey {

    const api = new Api();

    const getSurvey = function (id: string): Promise<void | Survey> {

        return api.api.v1SurveyDetail(id)
            .then((response) => response.data)
            .catch((error) => console.error('Error creating survey:', error));
    }

    return [getSurvey];
}