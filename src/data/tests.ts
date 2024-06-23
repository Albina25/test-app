import { Test } from "@/types";
export const tests: Array<Test> = [
    {
        id: 1,
        title: 'Test`s name',
        description: 'Описание теста Test`s name',
        questions: [
            {
                id: 1,
                value: 'Вопрос первый',
                correctAnswer: 'Вариант А',
                answers: [
                    {id: 1, value: 'Вариант А'},
                    {id: 2, value: 'Вариант Б'},
                    {id: 3, value: 'Вариант В'},
                    {id: 4, value: 'Вариант Г'},
                    {id: 5, value: 'Вариант Д'},
                    {id: 6, value: 'Вариант E'}
                ]
            },
            {
                id: 2,
                value: 'Вопрос еще один',
                correctAnswer: 'Вариант Б',
                answers: [
                    {id: 1, value: 'Вариант А'},
                    {id: 2, value: 'Вариант Б'},
                    {id: 3, value: 'Вариант В'},
                    {id: 4, value: 'Вариант Г'},
                    {id: 5, value: 'Вариант Д'},
                    {id: 6, value: 'Вариант E'}
                ]
            },
            {
                id: 3,
                value: 'Очень выжный вопрос',
                correctAnswer: 'Вариант В',
                answers: [
                    {id: 1, value: 'Вариант А'},
                    {id: 2, value: 'Вариант Б'},
                    {id: 3, value: 'Вариант В'},
                    {id: 4, value: 'Вариант Г'},
                    {id: 5, value: 'Вариант Д'},
                    {id: 6, value: 'Вариант E'}
                ]
            },
            {
                id: 4,
                value: 'Вопрос 4',
                correctAnswer: 'Вариант А',
                answers: [
                    {id: 1, value: 'Вариант А'},
                    {id: 2, value: 'Вариант Б'},
                    {id: 3, value: 'Вариант В'},
                    {id: 4, value: 'Вариант Г'},
                    {id: 5, value: 'Вариант Д'},
                    {id: 6, value: 'Вариант E'}
                ]
            },
            {
                id: 5,
                value: 'Вопрос особенный',
                correctAnswer: 'Lorem ipsum sit amet, consectetur adipiscing elit.',
                answers: [
                    {id: 1, value: 'Lorem ipsum sit amet, consectetur adipiscing elit.'},
                    {id: 2, value: 'Lorem ipsum dolor sit amet, consectetur adipsicing elit. Aliquam sollicitudin odio sit amet.'},
                    {id: 3, value: 'Lorem ipsum dolor sit amet, aliquam sollicitudin odio sit amet.'}
                ]
            }
        ]
    },
    {
        id: 2,
        title: 'Another Test',
        description: 'Описание теста Another Test',
        questions: [
            {
                id: 1,
                value: 'Вопрос',
                correctAnswer: 'Вариант А',
                answers: [
                    {id: 1, value: 'Вариант А'},
                    {id: 2, value: 'Вариант Б'},
                    {id: 3, value: 'Вариант В'},
                    {id: 4, value: 'Вариант Г'},
                    {id: 5, value: 'Вариант Д'},
                    {id: 6, value: 'Вариант E'}
                ]
            },
            {
                id: 2,
                value: 'Вопрос',
                correctAnswer: 'Вариант Б',
                answers: [
                    {id: 1, value: 'Вариант А'},
                    {id: 2, value: 'Вариант Б'},
                    {id: 3, value: 'Вариант В'},
                    {id: 4, value: 'Вариант Г'},
                    {id: 5, value: 'Вариант Д'},
                    {id: 6, value: 'Вариант E'}
                ]
            },
            {
                id: 3,
                value: 'Вопрос',
                correctAnswer: 'Вариант В',
                answers: [
                    {id: 1, value: 'Вариант А'},
                    {id: 2, value: 'Вариант Б'},
                    {id: 3, value: 'Вариант В'},
                    {id: 4, value: 'Вариант Г'},
                    {id: 5, value: 'Вариант Д'},
                    {id: 6, value: 'Вариант E'}
                ]
            },
            {
                id: 4,
                value: 'Вопрос',
                correctAnswer: 'Вариант А',
                answers: [
                    {id: 1, value: 'Вариант А'},
                    {id: 2, value: 'Вариант Б'},
                    {id: 3, value: 'Вариант В'},
                    {id: 4, value: 'Вариант Г'},
                    {id: 5, value: 'Вариант Д'},
                    {id: 6, value: 'Вариант E'}
                ]
            },
            {
                id: 5,
                value: 'Вопрос',
                correctAnswer: 'Lorem ipsum sit amet, consectetur adipiscing elit.',
                answers: [
                    {id: 1, value: 'Lorem ipsum sit amet, consectetur adipiscing elit.'},
                    {id: 2, value: 'Lorem ipsum dolor sit amet, consectetur adipsicing elit. Aliquam sollicitudin odio sit amet.'},
                    {id: 3, value: 'Lorem ipsum dolor sit amet, aliquam sollicitudin odio sit amet.'}
                ]
            }
        ]
    },
    {
        id: 3,
        title: 'Test',
        description: 'Описание теста Test',
        questions: [
            {
                id: 1,
                value: 'Вопрос',
                correctAnswer: 'Вариант А',
                answers: [
                    {id: 1, value: 'Вариант А'},
                    {id: 2, value: 'Вариант Б'},
                    {id: 3, value: 'Вариант В'},
                    {id: 4, value: 'Вариант Г'},
                    {id: 5, value: 'Вариант Д'},
                    {id: 6, value: 'Вариант E'}
                ]
            },
            {
                id: 2,
                value: 'Вопрос',
                correctAnswer: 'Вариант Б',
                answers: [
                    {id: 1, value: 'Вариант А'},
                    {id: 2, value: 'Вариант Б'},
                    {id: 3, value: 'Вариант В'},
                    {id: 4, value: 'Вариант Г'},
                    {id: 5, value: 'Вариант Д'},
                    {id: 6, value: 'Вариант E'}
                ]
            },
            {
                id: 3,
                value: 'Вопрос',
                correctAnswer: 'Вариант В',
                answers: [
                    {id: 1, value: 'Вариант А'},
                    {id: 2, value: 'Вариант Б'},
                    {id: 3, value: 'Вариант В'},
                    {id: 4, value: 'Вариант Г'},
                    {id: 5, value: 'Вариант Д'},
                    {id: 6, value: 'Вариант E'}
                ]
            },
            {
                id: 4,
                value: 'Вопрос',
                correctAnswer: 'Вариант А',
                answers: [
                    {id: 1, value: 'Вариант А'},
                    {id: 2, value: 'Вариант Б'},
                    {id: 3, value: 'Вариант В'},
                    {id: 4, value: 'Вариант Г'},
                    {id: 5, value: 'Вариант Д'},
                    {id: 6, value: 'Вариант E'}
                ]
            },
            {
                id: 5,
                value: 'Вопрос',
                correctAnswer: 'Lorem ipsum sit amet, consectetur adipiscing elit.',
                answers: [
                    {id: 1, value: 'Lorem ipsum sit amet, consectetur adipiscing elit.'},
                    {id: 2, value: 'Lorem ipsum dolor sit amet, consectetur adipsicing elit. Aliquam sollicitudin odio sit amet.'},
                    {id: 3, value: 'Lorem ipsum dolor sit amet, aliquam sollicitudin odio sit amet.'}
                ]
            }
        ]
    },
    {
        id: 4,
        title: 'Название теста',
        description: 'Описание теста Название теста',
        questions: [
            {
                id: 1,
                value: 'Вопрос',
                correctAnswer: 'Вариант А',
                answers: [
                    {id: 1, value: 'Вариант А'},
                    {id: 2, value: 'Вариант Б'},
                    {id: 3, value: 'Вариант В'},
                    {id: 4, value: 'Вариант Г'},
                    {id: 5, value: 'Вариант Д'},
                    {id: 6, value: 'Вариант E'}
                ]
            },
            {
                id: 2,
                value: 'Вопрос',
                correctAnswer: 'Вариант Б',
                answers: [
                    {id: 1, value: 'Вариант А'},
                    {id: 2, value: 'Вариант Б'},
                    {id: 3, value: 'Вариант В'},
                    {id: 4, value: 'Вариант Г'},
                    {id: 5, value: 'Вариант Д'},
                    {id: 6, value: 'Вариант E'}
                ]
            },
            {
                id: 3,
                value: 'Вопрос',
                correctAnswer: 'Вариант В',
                answers: [
                    {id: 1, value: 'Вариант А'},
                    {id: 2, value: 'Вариант Б'},
                    {id: 3, value: 'Вариант В'},
                    {id: 4, value: 'Вариант Г'},
                    {id: 5, value: 'Вариант Д'},
                    {id: 6, value: 'Вариант E'}
                ]
            },
            {
                id: 4,
                value: 'Вопрос',
                correctAnswer: 'Вариант А',
                answers: [
                    {id: 1, value: 'Вариант А'},
                    {id: 2, value: 'Вариант Б'},
                    {id: 3, value: 'Вариант В'},
                    {id: 4, value: 'Вариант Г'},
                    {id: 5, value: 'Вариант Д'},
                    {id: 6, value: 'Вариант E'}
                ]
            },
            {
                id: 5,
                value: 'Вопрос',
                correctAnswer: 'Lorem ipsum sit amet, consectetur adipiscing elit.',
                answers: [
                    {id: 1, value: 'Lorem ipsum sit amet, consectetur adipiscing elit.'},
                    {id: 2, value: 'Lorem ipsum dolor sit amet, consectetur adipsicing elit. Aliquam sollicitudin odio sit amet.'},
                    {id: 3, value: 'Lorem ipsum dolor sit amet, aliquam sollicitudin odio sit amet.'}
                ]
            }
        ]
    },
]