
import { Survey } from '../model/Survey';
import { Api } from './v8/myApi';

type NewSurvey = [(survey_id: string, instance_id: number, question_id: number, selection_id: number, other_choice_text: string) => Promise<void>];

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
export default function useAddInstanceSelection(): NewSurvey {

    const api = new Api();


    const addInstanceSelection = function (survey_id: string, instance_id: number, question_id: number, selection_id: number, other_choice_text: string): Promise<void> {

        return api.api.v1SurveyAddSurveyInstanceSelectionCreate(survey_id, {
            instance_id: instance_id,
            question_id: question_id,
            selection_id: selection_id,
            other_choice_text: other_choice_text
        })
            .then((response) => {
                console.log(response.data)
                // return response.data
            })
    }

    return [addInstanceSelection];
}