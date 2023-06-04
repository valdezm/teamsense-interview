
import { Survey } from '../model/Survey';
import { Api } from './v5/myApi';

type NewSurvey = [(name: string, questions_text: string, selections: any[]) => Promise<Survey>];

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
export default function useEditSurvey(): NewSurvey {

    const api = new Api();


    const editSurvey = function (survey_id: string, question_text: string, selections: any[]): Promise<Survey> {

        return api.api.v1SurveyAddQuestionCreate(survey_id, { question_text: question_text, question_selections: selections })
            .then((response) => {
                console.log(response.data)
                return response.data
            })
    }

    return [editSurvey];
}