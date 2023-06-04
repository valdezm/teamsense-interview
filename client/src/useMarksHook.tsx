import { useState } from "react";

type MarkHook = [number, (multiple?: number)=>void];

enum Marks {   
    A = 10,
    B = 20,
    C = 30,
    D = 40,
    E = 50,
    F = 60,
}

export default function useMarksHook(initialNumber: number = 10):MarkHook{
    console.log(Marks.A) 
    const [marks, setMarks] = useState<number>(initialNumber);
    const incrementCount = (multiple: number=3): void => {
        setMarks((prevState) => prevState * multiple);
      };
    
    return [marks, incrementCount];
}