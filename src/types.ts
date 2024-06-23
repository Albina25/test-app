interface Test {
    id: number,
    title: string,
    description: string,
    questions: Array<Question>,
}

interface Question {
    id: number,
    value: string,
    correctAnswer: string,
    userAnswer?: string | null,
    answers: Array<Answer>,
}

interface Answer {
    id: number,
    value: string,
}

interface UserAnswer {
    questionId: number,
    answerId: number,
}

export type { Test, Question, Answer, UserAnswer };