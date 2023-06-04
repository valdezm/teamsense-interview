
import { Survey } from '../model/Survey';
import { Api } from './v7/myApi';

type NewSurvey = [(name: string, description?: string) => Promise<Survey>];

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
export default function useNewSurvey(): NewSurvey {

    const api = new Api();

    const createSurvey = function (name: string, description?: string): Promise<Survey> {

        return api.api.v1SurveyCreate({ name: name, description: description })
            .then((response) => {
                console.log(response.data)
                return response.data
            })
    }

    return [createSurvey];
}