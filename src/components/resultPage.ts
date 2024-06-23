import {Question, Test, UserAnswer} from '@/types';
import {formatTimer} from "@/composables/timer";
import { loadQuestionPage } from '@/components/questionsPage';
//import { loadTemplate } from '@/main';

let currentTest: Test;
let userAnswers: Array<UserAnswer>;

export async function loadResultPage(test: Test, answers: Array<UserAnswer>, spentTime: number ) {
    currentTest = test;
    userAnswers = answers;

    const pageContent: HTMLElement = document.getElementById('page-content') as HTMLElement;
    if (pageContent) {
        const resultTemplate = await loadTemplate('./components/templates/result.html');
        if (resultTemplate) {
            pageContent.innerHTML = resultTemplate;

            displayTimer(spentTime);
            displayProgress(test, answers);
            displayCountAnswered();

            const testTitle = document.querySelector('.result-header__title');
            if (testTitle) testTitle.innerHTML = test.title;

            const answersContainer = document.querySelector('.result-content__answers');
            if (answersContainer) {
                test.questions.forEach(question => {
                    const correctAnswer: string = getCorrectAnswer(question);
                    const userAnswer: string = getUserAnswer(question, answers);

                    const answerElement = document.createElement('div');

                    answerElement.innerHTML = `
                    <div class="result-content__answer">
                        <p class="result-content__question">${question.id}. ${question.value}</p>
                        <div class="result-content__correct-answers">
                            <p class="result-content__answer-item">Правильный ответ: ${correctAnswer}</p>
                            <p class="result-content__answer-item">Вы ответили: ${userAnswer}</p> 
                        </div> 
                    </div>
                `;
                    answersContainer.appendChild(answerElement);
                });
            }

            const restartTestButton = document.getElementById('restart-test-button');
            if (restartTestButton) {
                restartTestButton.addEventListener('click', () => {
                    loadQuestionPage(currentTest, pageContent);
                })
            }
        }
    }
}

function displayProgress(test: Test, userAnswers: Array<UserAnswer>) {
    const testProgressElement = document.querySelector('.result-header__progress');
    if (testProgressElement) {
        const totalQuestions: number = getTotalQuestions(test);
        const countUserCorrectAnswers: number= getCountUserCorrectAnswers(test, userAnswers);
        testProgressElement.innerHTML = `${countUserCorrectAnswers}/${totalQuestions}`;
    }
}

function displayCountAnswered() {
    const progressContainer = document.querySelector('.test-progress');
    if (progressContainer) {
        const totalQuestions: number = getTotalQuestions(currentTest);
        const countAnsweredQuestions: number= getCountAnsweredQuestions();
        progressContainer.innerHTML = `Вы ответили на ${countAnsweredQuestions} из ${totalQuestions} вопросов`
    }
}

function getTotalQuestions(test: Test): number {
    return test.questions.length;
}

function getCountAnsweredQuestions(): number {
    return userAnswers.length;
}

function getCountUserCorrectAnswers(test: Test, userAnswers: Array<UserAnswer>): number {
    let correctAnswers: number = 0;
    test.questions.forEach(question => {
        const userAnswerId = userAnswers.find(answer => answer.questionId === question.id)?.answerId;
        if (userAnswerId === question.correctAnswer) {
            correctAnswers++;
        }
    });
    return correctAnswers;
}

function getCorrectAnswer(question: Question) {
    const correctAnswer = question.answers.find(answer => answer.id === question.correctAnswer);
    return correctAnswer ? correctAnswer.value : 'Не определено';
}

function getUserAnswer(question: Question, answers: Array<UserAnswer>) {
    const userAnswerId = answers.find(answer => answer.questionId === question.id)?.answerId;
    const userAnswer = question.answers.find(answer => answer.id === userAnswerId);
    return userAnswer ? userAnswer.value : 'Не ответили';
}

function displayTimer(spentTime: number) {
    const formattedTimer: string = formatTimer(spentTime);
    const timerElement  = document.querySelector('.result-header__time');
    if (timerElement && timerElement instanceof HTMLElement) {
        timerElement.innerText = formattedTimer;
    }
}

async function loadTemplate(url: string): Promise<string> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            return `<p style="padding: 16px">Error loading template</p>`;
        }
        return await response.text();
    } catch (error) {
        return `<p style="padding: 16px">Error loading template</p>`;
    }
}