
import { Survey } from '../model/Survey';
import { Api } from './v6/myApi';

type NewSurvey = [(survey_id: string, name: string) => Promise<Survey>];

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
export default function useTakeSurvey(): NewSurvey {

    const api = new Api();


    const takeSurvey = function (survey_id: string, name: string): Promise<Survey> {

        return api.api.v1SurveyStartSurveyCreate(survey_id, { name: name })
            .then((response) => {
                console.log(response.data)
                return response.data
            })
    }

    return [takeSurvey];
}